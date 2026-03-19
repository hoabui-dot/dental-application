/**
 * Debug Utilities for API Integration
 *
 * Logging helpers for debugging data flow.
 * Only active in development mode.
 */

const DEBUG_ENABLED = process.env.NODE_ENV === "development";

/**
 * Log API response
 */
export function logApiResponse(endpoint: string, response: any) {
  if (!DEBUG_ENABLED) return;

  console.group(`🔍 API Response: ${endpoint}`);
  console.log("Raw response:", JSON.stringify(response, null, 2));
  console.log("Data count:", response.data?.length || 0);
  console.groupEnd();
}

/**
 * Log transformed data
 */
export function logTransformedData(label: string, data: any) {
  if (!DEBUG_ENABLED) return;

  console.group(`✨ Transformed Data: ${label}`);
  console.log(JSON.stringify(data, null, 2));
  console.groupEnd();
}

/**
 * Log block rendering
 */
export function logBlockRendering(layout: any[]) {
  if (!DEBUG_ENABLED) return;

  console.group("🎨 Block Rendering");
  console.log("Total blocks:", layout.length);
  layout.forEach((block, index) => {
    console.log(`Block ${index + 1}:`, {
      blockType: block.blockType,
      hasImage: !!block.image,
      itemsCount: block.items?.length || 0,
    });
  });
  console.groupEnd();
}

/**
 * Log component mapping
 */
export function logComponentMapping(component: string, blockType: string) {
  if (!DEBUG_ENABLED) return;

  console.log(`🔄 Component mapping: ${component} → ${blockType}`);
}

/**
 * Log media transformation
 */
export function logMediaTransform(original: any, transformed: any) {
  if (!DEBUG_ENABLED) return;

  console.group("🖼️ Media Transform");
  console.log("Original:", original);
  console.log("Transformed:", transformed);
  console.groupEnd();
}

/**
 * Log error with context
 */
export function logError(context: string, error: any) {
  console.error(`❌ Error in ${context}:`, error);
  if (error.response) {
    console.error("Response data:", error.response.data);
    console.error("Response status:", error.response.status);
  }
}
