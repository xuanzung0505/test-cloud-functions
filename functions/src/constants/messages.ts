export const COMMON_MESSAGES = {
  INTERNAL_SERVER_ERROR: "Internal server error",
};

export const USERS_MESSAGES = {
  VALIDATION_ERROR: "Validation error",
} as const;

export const PAGINATION_MESSAGES = {
  LIMIT_MUST_BE_BIGGER_THAN_ZERO: "Limit must be bigger than zero",
  SORT_IS_INVALID: "Sort is invalid",
} as const;

export const PRODUCTS_MESSAGES = {
  PRODUCT_NAME_IS_REQUIRED: "Product name is required",
  PRODUCT_PRICE_IS_REQUIRED: "Product price is required",
  PRODUCT_DESCRIPTION_IS_REQUIRED: "Product description is required",
  PRODUCT_PRODUCT_IS_REQUIRED: "Product type is required",
  PRODUCT_COLOR_IS_REQUIRED: "Product name is required",
  PRODUCT_IMAGE_IS_REQUIRED: "Product image is required",
  PRODUCT_ID_IS_REQUIRED: "Product id is required",
  PRODUCT_ID_IS_INVALID: "Product id is invalid",
  SAVE_PRODUCT_SUCCESSFULLY: "Save product successfully",
  PRODUCT_NOT_FOUND: "Product not found",
  GET_PRODUCT_SUCCESSFULLY: "Get product successfully",
  GET_PRODUCTS_SUCCESSFULLY: "Get products successfully",
  UPDATE_PRODUCT_SUCCESSFULLY: "Update product successfully",
  DELETE_PRODUCT_SUCCESSFULLY: "Delete product successfully",
} as const;
