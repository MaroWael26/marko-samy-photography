// ============================================
// MARKO SAMY PHOTOGRAPHY - GOOGLE REVIEWS DATA
// ============================================
// آخر تحديث: 2024-01-15
// تعليمات: انسخ بيانات التقييمات من Google Maps وضعها هنا

const googleReviewsData = {
    // ملخص التقييمات
    summary: {
        rating: "4.9",           // متوسط التقييم
        totalReviews: "40",     // عدد التقييمات
        googleUrl: "https://g.page/r/YOUR_PLACE_ID/review" // رابط كتابة تقييم
    },
    
    // التقييمات الفردية
    reviews: [
        {
            id: 1,
            name: "Maro Wael",
            photo: "https://lh3.googleusercontent.com/a/ACg8ocJxIh_0JBJRNp3Lyw2uCBD8MpWb5dUzkI0wpi7kPQBtXM_FFfB8Yw=w45-h45-p-rp-mo-br100", // رابط صورة البروفايل
            rating: 5,            // عدد النجوم (1-5)
            time: "1 year ago",          // المدة ("منذ أسبوع", "منذ شهر", "منذ 3 أشهر")
            text: "Honestly, Marko is amazing ! Super talented and really knows how to capture the moment perfectly. The photos turned out way better than I expected – great lighting, awesome vibes, and just overall super clean shots. He was chill and easy to work with, made everyone feel comfortable, and you can tell he loves what he does. Got the photos on time too, no delays or stress. If you’re looking for someone who’s creative, professional, and actually cares about the details – Marko’s your guy. Highly recommend !"
        },
        {
            id: 2,
            name: "Saja Sami",
            photo: "https://lh3.googleusercontent.com/a-/ALV-UjWwxToGR6pzHIhyZd5Jzi-HfyS52IJaFfm50W5et3CiTCVmZeX6Hg=w45-h45-p-rp-mo-ba12-br100",
            rating: 5,
            time: "1 year ago",
            text: "Marko was my wedding photographer in 2022. He was THE BEST! He really managed to capture all the beautiful moments and he helped us make a lot of nice memories. All the guests and anyone who saw our wedding photos said that photos made the …"
        },
        {
            id: 3,
            name: "neno marcous",
            photo: "https://lh3.googleusercontent.com/a/ACg8ocJtnJnPzaU3eINPBXg7h7pjG8EBvDK8qhYqjFho1LJy_SJlnQ=w45-h45-p-rp-mo-br100",
            rating: 5,
            time: "1 year ago",
            text: "I’m lucky to know one of the most talented photographers I’ve ever met. Not only does he have a natural eye for capturing moments in the most authentic and artistic way, but he’s also someone you can always count on. His work reflects creativity, precision, and a real passion for telling stories through images. But what truly makes him stand out isn’t just the photography — it’s the person behind the camera. We’ve shared a beautiful friendship over the years, full of genuine laughs, support, and unforgettable memories. He’s not just a great photographer, he’s a great friend — loyal, kind-hearted, and always there when you need him. Good friends are rare, and great ones are even rarer — I’m proud to call him both. ❤️❤️"
        },
        {
            id: 4,
            name: "Dina Ibrahem",
            photo: "https://lh3.googleusercontent.com/a-/ALV-UjWumrfKxz-6ch-xzbu3ztH-g84ED7O3Yh7F67fFk--KNOuG3K_KoQ=w45-h45-p-rp-mo-br100",  // لو مفيش صورة، سيبها فاضية
            rating: 5,
            time: "1 year ago",
            text: "Honestly, the most talented photographer I've worked with—multiple times, not just once! Shooting with him is always so comfortable, and Marco is such a respectful and incredibly skilled person. Even when he's just using a phone to shoot, I’ve never seen anyone like him! ❤️❤️❤️❤️"
        },
        {
            id: 5,
            name: "Menna Khaled",
            photo: "https://lh3.googleusercontent.com/a/ACg8ocJv2Ms43MTOpa3eBu0sUhwz8OKPQpH0f0K5Zy4KM8XUFX-z_A=w45-h45-p-rp-mo-br100",
            rating: 5,
            time: "1 year ago",
            text: "Marco is such a nice and respectful person He’s always helpful and well organized. I’ve worked with him on many events like weddings, conferences, and exhibitions. He always delivers high-quality photos and videos really fast. I really appreciate all the amazing work you always do for me 🥰 …"
        },
        {
            id: 6,
            name: "Alisabat Salama",
            photo: "https://lh3.googleusercontent.com/a-/ALV-UjWQBEH_CuUaBMiluDUbVlRJ1GtCt2HuGvA_djac0vVKKEH2eHgi=w45-h45-p-rp-mo-br100",
            rating: 5,
            time: "1 year ago",
            text: "Marko is a skilled, easy-going photographer with a keen eye for detail and true professional vision. Thank you Marko"
        }
        ,
        {
            id: 7,
            name: "Hasnaa Noor",
            photo: "https://lh3.googleusercontent.com/a-/ALV-UjUEN7TZdLcM_-BmMh6UfgVsAlCmrnYe3MJB1FMH2pbYrIPe6-xy=w45-h45-p-rp-mo-br100",
            rating: 5,
            time: "1 year ago",
            text: "Marko Sami is an exceptionally talented photographer. His creativity, attention to detail, and professionalism truly set him apart. I am absolutely delighted with the results and highly recommend his services!♥️♥️✨"
        }
    ]
};

// ============================================
// لو عايز تضيف تقييم جديد، استخدم القالب ده:
// ============================================
/*
{
    id: 7,                          // رقم تسلسلي
    name: "اسم العميل",              // الاسم كامل
    photo: "رابط صورة البروفايل",     // أو اتركه "" لو مفيش صورة
    rating: 5,                      // عدد النجوم من 1 لـ 5
    time: "منذ ...",                // المدة ("منذ أسبوع", "منذ شهر", "منذ 3 أشهر")
    text: "نص التقييم هنا..."       // نص التقييم كامل
}
*/