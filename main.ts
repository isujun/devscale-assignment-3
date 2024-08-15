const packStatus = new Set(["draft", "approved", "shipped"] as const);

packStatus.has("approved");
