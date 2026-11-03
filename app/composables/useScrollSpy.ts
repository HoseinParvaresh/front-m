export function useScrollSpy(sectionIds: string[]) {
  const activeId = ref<string>(sectionIds[0] ?? "");

  function scrollToSection(id: string) {
    activeId.value = id;
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return { activeId, scrollToSection };
}
