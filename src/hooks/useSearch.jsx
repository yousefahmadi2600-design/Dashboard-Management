export default function useSearch(
  data,
  { searchValue = "", majorList = [], statusList = [] },
) {
  const filteredList = data.filter((item) => {
    const namaMatch =
      item.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.instructor?.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.studentId?.toLowerCase().includes(searchValue.toLowerCase());
    const CategoryMatch =
      majorList.length === 0
        ? true
        : majorList.some((categorySelecter) =>
            item.categories?.some(
              (category) =>
                category.toLowerCase() === categorySelecter.value.toLowerCase(),
            ),
          ) ||
          majorList.some(
            (majorSelecter) =>
              item.major?.toLowerCase() === majorSelecter.value.toLowerCase(),
          );
    const statusMatch =
      statusList.length === 0
        ? true
        : statusList.some((status) => status.value === item.status);
    return namaMatch && CategoryMatch && statusMatch;
  });

  return filteredList;
}
