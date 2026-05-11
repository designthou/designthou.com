type ReviewsCategoryList = (typeof reviewsCategoryList)[number];

const reviewsCategoryList = ['offline(실전 프로그램 + 포트폴리오)', 'online-course'] as const;

export type { ReviewsCategoryList };
export { reviewsCategoryList };
