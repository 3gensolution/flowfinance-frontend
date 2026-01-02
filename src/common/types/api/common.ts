/**
 * A success response from the API.
 */
export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
};

/**
 * An error response from the API.
 */
export type ApiErrorResponse = {
  success: false;
  error: string | string[];
};

/**
 * A response from the API.
 */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * A paginated response from the API.
 */
export type PaginatedApiResponse<T> = ApiResponse<{
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}>;
