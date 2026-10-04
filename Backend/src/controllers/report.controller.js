import postModel from "../models/posts.model.js";


// GET REPORTS
export const getReports = async (req, res) => {
  try {

    // 1. USER PUBLISHING ACTIVITY

    const userActivity = await postModel.aggregate([
      {
        $group: {
          _id: "$ownerId",

          totalPosts: {
            $sum: 1,
          },

          publicPosts: {
            $sum: {
              $cond: ["$isPublic", 1, 0],
            },
          },

          privatePosts: {
            $sum: {
              $cond: ["$isPublic", 0, 1],
            },
          },
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },

      {
        $unwind: "$user",
      },

      {
        $project: {
          _id: 0,
          userId: "$_id",
          name: "$user.name",
          email: "$user.email",
          totalPosts: 1,
          publicPosts: 1,
          privatePosts: 1,
        },
      },

      {
        $sort: {
          totalPosts: -1,
        },
      },
    ]);


    // 2. CATEGORY-WISE POSTS

    const categoryDistribution = await postModel.aggregate([
      {
        $group: {
          _id: "$category",

          totalPosts: {
            $sum: 1,
          },
        },
      },

      {
        $project: {
          _id: 0,
          category: "$_id",
          totalPosts: 1,
        },
      },

      {
        $sort: {
          totalPosts: -1,
        },
      },
    ]);


    // 3. PUBLIC VS PRIVATE

    const visibilityData = await postModel.aggregate([
      {
        $group: {
          _id: "$isPublic",

          totalPosts: {
            $sum: 1,
          },
        },
      },
    ]);

    const visibility = {
      public: 0,
      private: 0,
    };

    visibilityData.forEach((item) => {
      if (item._id === true) {
        visibility.public = item.totalPosts;
      } else {
        visibility.private = item.totalPosts;
      }
    });


    // 4. POST ACTIVITY OVER TIME

    const activityOverTime = await postModel.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },

          totalPosts: {
            $sum: 1,
          },
        },
      },

      {
        $project: {
          _id: 0,
          date: "$_id",
          totalPosts: 1,
        },
      },

      {
        $sort: {
          date: 1,
        },
      },
    ]);


    // 5. USER + CATEGORY REPORT

    const userCategory = await postModel.aggregate([
      {
        $group: {
          _id: {
            userId: "$ownerId",
            category: "$category",
          },

          totalPosts: {
            $sum: 1,
          },
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "_id.userId",
          foreignField: "_id",
          as: "user",
        },
      },

      {
        $unwind: "$user",
      },

      {
        $project: {
          _id: 0,
          userId: "$_id.userId",
          name: "$user.name",
          category: "$_id.category",
          totalPosts: 1,
        },
      },

      {
        $sort: {
          name: 1,
          totalPosts: -1,
        },
      },
    ]);


    res.json({
      userActivity,
      categoryDistribution,
      visibility,
      activityOverTime,
      userCategory,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to generate reports.",
    });
  }
};