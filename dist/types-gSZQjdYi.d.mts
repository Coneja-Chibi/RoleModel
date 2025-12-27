/**
 * LLM Model Registry Types
 *
 * Type definitions for the model registry - context limits, pricing,
 * capabilities, and provider information.
 */
/**
 * Raw model data from OpenRouter's /api/v1/models endpoint
 */
interface OpenRouterModel {
    id: string;
    name: string;
    description?: string;
    context_length: number;
    max_completion_tokens?: number;
    pricing: {
        prompt: string;
        completion: string;
        image?: string;
        request?: string;
    };
    top_provider?: {
        context_length?: number;
        max_completion_tokens?: number;
        is_moderated?: boolean;
    };
    architecture?: {
        modality: string;
        tokenizer: string;
        instruct_type?: string | null;
    };
    per_request_limits?: {
        prompt_tokens?: number;
        completion_tokens?: number;
    } | null;
}
interface OpenRouterModelsResponse {
    data: OpenRouterModel[];
}
/**
 * Provider information extracted from model ID
 */
interface ModelProvider {
    id: string;
    name: string;
    color: string;
    icon?: string;
}
/**
 * Parsed pricing in more usable format
 */
interface ModelPricing {
    promptPerMillion: number;
    completionPerMillion: number;
    imagePerImage?: number;
    isFree: boolean;
}
/**
 * Model capabilities and features
 */
interface ModelCapabilities {
    supportsImages: boolean;
    supportsTools: boolean;
    supportsStreaming: boolean;
    isModerated: boolean;
    modality: 'text' | 'text+image' | 'multimodal';
    instructType?: string;
}
/**
 * Size tier classification for quick filtering
 */
type ModelSizeTier = 'tiny' | 'small' | 'medium' | 'large' | 'massive';
/**
 * The main model type used throughout the library
 */
interface LLMModel {
    id: string;
    slug: string;
    name: string;
    description?: string;
    provider: ModelProvider;
    contextLength: number;
    maxCompletionTokens: number;
    sizeTier: ModelSizeTier;
    pricing: ModelPricing;
    capabilities: ModelCapabilities;
    tokenizer?: string;
    updatedAt: string;
}
/**
 * Cache metadata for the model registry
 */
interface RegistryMetadata {
    version: number;
    fetchedAt: string;
    expiresAt: string;
    modelCount: number;
    source: 'api' | 'snapshot' | 'fallback';
}
/**
 * The complete model registry
 */
interface ModelRegistry {
    metadata: RegistryMetadata;
    models: LLMModel[];
    byId: Record<string, LLMModel>;
    byProvider: Record<string, LLMModel[]>;
    byTier: Record<ModelSizeTier, LLMModel[]>;
}
/**
 * Filter options for querying models
 */
interface ModelQueryOptions {
    provider?: string | string[];
    minContext?: number;
    maxContext?: number;
    tier?: ModelSizeTier | ModelSizeTier[];
    isFree?: boolean;
    supportsImages?: boolean;
    search?: string;
    sortBy?: 'context' | 'price' | 'name' | 'provider';
    sortOrder?: 'asc' | 'desc';
    limit?: number;
}
declare const KNOWN_PROVIDERS: Record<string, Omit<ModelProvider, 'id'>>;
declare const UNKNOWN_PROVIDER: Omit<ModelProvider, 'id'>;

export { KNOWN_PROVIDERS as K, type LLMModel as L, type ModelRegistry as M, type OpenRouterModel as O, type RegistryMetadata as R, UNKNOWN_PROVIDER as U, type ModelSizeTier as a, type ModelQueryOptions as b, type ModelProvider as c, type OpenRouterModelsResponse as d, type ModelPricing as e, type ModelCapabilities as f };
