type SortOption = 'newest' | 'popular'

export function useModelsFilters() {
  const sortBy = useState<SortOption>('models-sort', () => 'newest')
  const selectedCategories = useState<string[]>('models-categories', () => [])

  function toggleCategory(id: string, checked: boolean) {
    if (checked) selectedCategories.value = [...selectedCategories.value, id]
    else selectedCategories.value = selectedCategories.value.filter((c) => c !== id)
  }

  function clearFilters() {
    selectedCategories.value = []
    sortBy.value = 'newest'
  }

  return { sortBy, selectedCategories, toggleCategory, clearFilters }
}