const categories = [
    {
        id: "59184083-e04f-4aa5-9943-45a749cae980",
        image:
            "https://d2d5n4ft74bagm.cloudfront.net/media/featured-category/59184083-e04f-4aa5-9943-45a749cae980/1789537038.png?w=90",
    },
    {
        id: "a783f54d-0e07-4e97-b1e2-abf8846fbef9",
        image:
            "https://d2d5n4ft74bagm.cloudfront.net/media/featured-category/a783f54d-0e07-4e97-b1e2-abf8846fbef9/1787214770.png?w=90",
    },
    {
        id: "56ba705d-69df-40b2-b5b5-7f51f7127fbd",
        image:
            "https://d2d5n4ft74bagm.cloudfront.net/media/featured-category/56ba705d-69df-40b2-b5b5-7f51f7127fbd/1787214782.png?w=90",
    },
    {
        id: "333207f2-f3fe-4020-825f-45c4cbd05c9a",
        image:
            "https://d2d5n4ft74bagm.cloudfront.net/media/featured-category/333207f2-f3fe-4020-825f-45c4cbd05c9a/1787214804.png?w=90",
    },
    {
        id: "df5f9492-53eb-4a12-8db0-4367b77bcd70",
        image:
            "https://d2d5n4ft74bagm.cloudfront.net/media/featured-category/df5f9492-53eb-4a12-8db0-4367b77bcd70/1787214822.png?w=90",
    },
    {
        id: "09898572-d1f8-4b19-887b-96e58bf456c1",
        image:
            "https://d2d5n4ft74bagm.cloudfront.net/media/featured-category/09898572-d1f8-4b19-887b-96e58bf456c1/1787214838.png?w=90",
    },
    {
        id: "2bc1ad6e-4a4c-4fe4-955b-65d28e5d8b36",
        image:
            "https://d2d5n4ft74bagm.cloudfront.net/media/featured-category/2bc1ad6e-4a4c-4fe4-955b-65d28e5d8b36/1789542270.png?w=90",
    },
    {
        id: "8d9d1cbd-1180-487e-b078-4364f8246761",
        image:
            "https://d2d5n4ft74bagm.cloudfront.net/media/featured-category/8d9d1cbd-1180-487e-b078-4364f8246761/1787292782.png?w=90",
    },
    {
        id: "0ddd6589-25a3-4d03-91c5-1f411aaaa9b2",
        image:
            "https://d2d5n4ft74bagm.cloudfront.net/media/featured-category/0ddd6589-25a3-4d03-91c5-1f411aaaa9b2/1789466883.png?w=90",
    },
];

const ShopByCategory = () => {
    return (
        <section className="my-[28px] pl-8 pr-8 ">
            {/* Heading */}
            <div className="my-0 md:my-[16px] md:px-[52px]">
                <div className="flex flex-col uppercase">
                    <span className="font-light text-[20px] leading-normal md:text-[36px] md:leading-none">
                        SHOP BY
                    </span>

                    <h2 className="font-bold text-[24px] leading-[26px] md:text-[36px] md:leading-none">
                        CATEGORY
                    </h2>

                    <div className="hidden md:block h-[3px] w-[309px] bg-orange-700 mt-[16px]" />
                </div>
            </div>

            {/* Mobile Divider */}
            <div className="h-[3px] w-full bg-orange-700 mt-[16px] md:hidden" />

            {/* Categories */}
            <div className="flex overflow-x-auto no-scrollbar">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="relative shrink-0 w-[220px] h-[294px] md:w-[289px] md:h-[335px] border-4 border-white bg-[#f9f9f9] cursor-pointer overflow-hidden"
                    >
                        <img
                            src={category.image}
                            alt="Category"
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Shop All */}
            <a
                href="/shop"
                className="flex w-fit underline mt-[16px] md:ml-[112px]"
            >
                <span className="font-normal text-[14px] md:text-[16px]">
                    SHOP ALL
                </span>
            </a>
        </section>
    );
};

export default ShopByCategory;