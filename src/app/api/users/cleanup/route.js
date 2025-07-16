import { NextResponse } from "next/server";
import { users } from "../update/route";
import fs from "fs";
import path from "path";

// Function to save users to the file
function saveUsersToFile() {
  try {
    const usersFilePath = path.join(process.cwd(), "users.json");
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    console.log("Users saved to file after cleanup");
    return true;
  } catch (error) {
    console.error("Error saving users to file:", error);
    return false;
  }
}

export async function GET(request) {
  try {
    console.log("Running cleanup to remove GitHub users");

    // Count initial users
    const initialCount = users.length;

    // Find GitHub users
    const githubUsers = users.filter(
      (user) => user.oauthProvider === "github" || user.github_login
    );

    console.log(`Found ${githubUsers.length} GitHub users to remove`);

    // Remove GitHub users
    const indexesToRemove = [];
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (user.oauthProvider === "github" || user.github_login) {
        indexesToRemove.push(i);
      }
    }

    // Remove from highest index to lowest to avoid shifting issues
    indexesToRemove
      .sort((a, b) => b - a)
      .forEach((index) => {
        users.splice(index, 1);
      });

    // Fix any remaining users that might have GitHub-related fields
    for (let i = 0; i < users.length; i++) {
      if (users[i].github_login) {
        delete users[i].github_login;
      }

      // If a user has no provider specified but has Google-related attributes, set to Google
      if (!users[i].oauthProvider && users[i].avatar_url) {
        users[i].oauthProvider = "google";
      }
    }

    // Save changes
    saveUsersToFile();

    const removedCount = initialCount - users.length;
    console.log(`Cleanup completed. Removed ${removedCount} GitHub users.`);

    return NextResponse.json({
      success: true,
      message: `Cleanup completed. Removed ${removedCount} GitHub users.`,
    });
  } catch (error) {
    console.error("Error in GitHub users cleanup:", error);
    return NextResponse.json(
      { success: false, message: "Failed to cleanup GitHub users" },
      { status: 500 }
    );
  }
}
