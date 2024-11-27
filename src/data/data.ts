

export const posts = [
    {
        id: "1",
        title: "Photography Tips for Beginners",
        description: "Learn the basics of photography and capture stunning images.",
        content: "Detailed photography tips...",
        imageUrl: "https://picsum.photos/200/300?random=1",
        tags: ["photography", "beginners", "tips"],
        featured: true,
        likes: 15,
        comments: [
            { id: "1", userId: "1", text: "Amazing tips! Really helpful for beginners." },
            { id: "2", userId: "2", text: "Thanks for sharing, I learned a lot." },
        ],
    },
    {
        id: "2",
        title: "Delicious Cooking Recipes to Try",
        description: "Explore a variety of mouth-watering cooking recipes.",
        content: "Detailed cooking recipes...",
        imageUrl: "https://picsum.photos/200/300?random=2",
        tags: ["cooking", "recipes", "delicious"],
        featured: false,
        likes: 10,
        comments: [
            { id: "3", userId: "3", text: "I tried the lasagna recipe, and it was fantastic!" },
        ],
    },
    {
        id: "3",
        title: "Ultimate Guide to Digital Art",
        description: "Master digital art techniques and bring your ideas to life.",
        content: "Detailed guide on digital art...",
        imageUrl: "https://picsum.photos/200/300?random=3",
        tags: ["digital art", "creativity", "design"],
        featured: true,
        likes: 25,
        comments: [
            { id: "4", userId: "2", text: "This guide is a goldmine for digital artists!" },
            { id: "5", userId: "4", text: "I’ve bookmarked this. Thanks a ton!" },
        ],
    },
    {
        id: "4",
        title: "Photography in Nature: Tips and Techniques",
        description: "Capture stunning nature photographs with these simple techniques.",
        content: "Detailed nature photography tips...",
        imageUrl: "https://picsum.photos/200/300?random=4",
        tags: ["photography", "nature", "outdoors"],
        featured: false,
        likes: 8,
        comments: [
            { id: "6", userId: "1", text: "Nature photography is my favorite. Thanks!" },
        ],
    },
    {
        id: "5",
        title: "Pasta Recipes from Italy",
        description: "Try these delicious traditional pasta recipes straight from Italy.",
        content: "Detailed pasta recipes...",
        imageUrl: "https://picsum.photos/200/300?random=5",
        tags: ["pasta", "recipes", "italy"],
        featured: false,
        likes: 12,
        comments: [
            { id: "7", userId: "3", text: "Italian pasta recipes are the best. Yummy!" },
        ],
    },
];


export const featuredPosts = posts.filter((post) => post.featured);


export const users = [
    { id: "1", username: "john_doe", email: "john@example.com", profilePic: "https://via.placeholder.com/150", password: "password123" },
    { id: "2", username: "jane_smith", email: "jane@example.com", profilePic: "https://via.placeholder.com/150", password: "password456" },
];

export const addUser = (username: string, password: string, email: string, profilePic: string) => {
    const newUser = {
        id: (users.length + 1).toString(), // Create a new id based on the length of the users array
        username,
        email,
        profilePic,
        password,
    };
    users.push(newUser);
};

export const userExists = (username: string) => {
    return users.some((user) => user.username === username);
};

export const getUserByUsername = (username: string) => {
    return users.find((user) => user.username === username);
};