export type ConversationStatus = "idle" | "active" | "paused";

export type ImageQualityLevel = "low" | "medium" | "high";

export type MessageType = "system" | "ai" | "alert" | "error";

export interface VisionMessage {
  id: string;
  conversationId: string;
  type: MessageType;
  timestamp: number;
  prompt?: string;
  response?: string;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  cost: number;
  alertTriggered: boolean;
}

export interface Conversation {
  id: string;
  name: string;
  status: ConversationStatus;
  cameraDeviceId: string;
  frameIntervalSeconds: number;
  promptText: string;
  alertCondition: string;
  imageQualityLevel: ImageQualityLevel;
  maxResponseChars: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  totalTokens: number;
  totalCost: number;
  framesSent: number;
  avgCostPerFrame: number;
  createdAt: number;
  updatedAt: number;
}

export interface ConversationFormData {
  name: string;
  cameraDeviceId: string;
  frameIntervalSeconds: number;
  promptText: string;
  alertCondition: string;
  imageQualityLevel: ImageQualityLevel;
  maxResponseChars: number;
}

export const IMAGE_QUALITY_CONFIG: Record<
  ImageQualityLevel,
  { resize: string; compression: string }
> = {
  low: { resize: "640px", compression: "High" },
  medium: { resize: "1024px", compression: "Medium" },
  high: { resize: "1920px", compression: "Low" },
};

export const DEFAULT_FORM_DATA: ConversationFormData = {
  name: "",
  cameraDeviceId: "front",
  frameIntervalSeconds: 5,
  promptText: "",
  alertCondition: "",
  imageQualityLevel: "medium",
  maxResponseChars: 120,
};
