const prefix = "/admin";
export const adminRoutes = [
  {
    title: "Management",

    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
      {
        title: "Approve Submissions",
        url: `${prefix}/submissions`,
      },
    ],
  },
  {
    title: "Statistics",

    items: [
      {
        title: "Submission statistics",
        url: `${prefix}/statistics`,
      },
    ],
  },
];
