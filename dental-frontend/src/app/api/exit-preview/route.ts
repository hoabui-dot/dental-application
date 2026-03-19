/**
 * Exit Preview Mode API Route
 *
 * Disables draft mode and returns user to normal published content.
 * Called when user clicks "Exit Preview" button.
 */

import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  // Disable draft mode
  const draft = await draftMode();
  draft.disable();

  // Redirect to homepage
  redirect("/");
}
