// import { query } from "express-validator";
// import { SortDirection } from "../../types/sort-direction.type";
// import { PaginationAndSorting } from "../../types/pagination-and-sorting.type";

// const DEFAULT_SEARCH_TERM = null;
// const DEFAULT_SORT_BY = "createdAt";
// const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
// const DEFAULT_PAGE_NUMBER = 1;
// const DEFAULT_PAGE_SIZE = 10;

// export function paginationAndSortingValidation(
//   sortFieldsEnum: Record<string, string>,
// ) {
//   const allowedSortFields = Object.values(sortFieldsEnum);

//   const pageNumberValidation = query("pageNumber")
//     .default(DEFAULT_PAGE_NUMBER)
//     .isInt({ min: 1 })
//     .withMessage("Page number must be a positive integer")
//     .toInt();

//   const pageSizeValidation = query("pageSize")
//     .default(DEFAULT_PAGE_SIZE)
//     .isInt({ min: 1, max: 100 })
//     .withMessage("Page size must be between 1 and 100")
//     .toInt();

//   const sortByValidation = query("sortBy")
//     .default(Object.values(sortFieldsEnum)[0]) // Первое значение enum как дефолтное
//     .isIn(allowedSortFields)
//     .withMessage(
//       `Invalid sort field. Allowed values: ${allowedSortFields.join(", ")}`,
//     );

//   const sortDirectionValidation = query("sortDirection")
//     .default(DEFAULT_SORT_DIRECTION)
//     .isIn(Object.values(SortDirection))
//     .withMessage(
//       `Sort direction must be one of: ${Object.values(SortDirection).join(", ")}`,
//     );
//   return [
//     pageNumberValidation,
//     pageSizeValidation,
//     sortByValidation,
//     sortDirectionValidation,
//   ];
// }
