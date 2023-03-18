export const pagesPath = {
  assessment: {
    $url: (url?: { hash?: string }) => ({ pathname: '/assessment' as const, hash: url?.hash }),
  },
  curriculum: {
    $url: (url?: { hash?: string }) => ({ pathname: '/curriculum' as const, hash: url?.hash }),
  },
  login: {
    school: {
      $url: (url?: { hash?: string }) => ({ pathname: '/login/school' as const, hash: url?.hash }),
    },
    student: {
      $url: (url?: { hash?: string }) => ({ pathname: '/login/student' as const, hash: url?.hash }),
    },
    teacher: {
      $url: (url?: { hash?: string }) => ({ pathname: '/login/teacher' as const, hash: url?.hash }),
    },
  },
  self_analysis: {
    $url: (url?: { hash?: string }) => ({ pathname: '/self_analysis' as const, hash: url?.hash }),
  },
  simulation: {
    intro: {
      $url: (url?: { hash?: string }) => ({
        pathname: '/simulation/intro' as const,
        hash: url?.hash,
      }),
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/simulation' as const, hash: url?.hash }),
  },
  student: {
    _id: (id: string | number) => ({
      $url: (url?: { hash?: string }) => ({
        pathname: '/student/[id]' as const,
        query: { id },
        hash: url?.hash,
      }),
    }),
    create: {
      $url: (url?: { hash?: string }) => ({
        pathname: '/student/create' as const,
        hash: url?.hash,
      }),
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/student' as const, hash: url?.hash }),
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash }),
};

export type PagesPath = typeof pagesPath;

export const staticPath = {
  $404_html: '/404.html',
  favicon_svg: '/favicon.svg',
  images: {
    sakiyuku_logo_png: '/images/sakiyuku_logo.png',
    sakiyuku_slim_logo_png: '/images/sakiyuku_slim_logo.png',
    sakiyuku_white_logo_png: '/images/sakiyuku_white_logo.png',
  },
  index_html: '/index.html',
} as const;

export type StaticPath = typeof staticPath;
