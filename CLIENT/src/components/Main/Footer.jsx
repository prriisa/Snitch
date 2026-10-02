import React from "react";

const COLORS = {
  footerBg: "#F7EEE8", 
  primary: "#C45E3D",
};

const FONT = '"Helvetica Neue", Helvetica, Arial, sans-serif';

const bold = { fontFamily: FONT, fontSize: 15, fontWeight: 700 };
const light = { fontFamily: FONT, fontSize: 13, lineHeight: 1.2 };

const CATEGORIES = [
  "T-shirts",
  "Shirts",
  "Joggers",
  "Shorts",
  "Trousers",
  "Sweatshirts & Hoodies",
  "Sweaters",
  "Bags",
  "Accessories",
  "Belts",
  "Blazers",
  "Boxers",
  "Cargo Pants",
  "Chinos",
  "Co-ords",
  "Hoodies",
  "Jackets",
  "Jeans",
  "Night Suit & Pyjamas",
  "Overshirt",
  "Perfumes",
  "Shoes",
  "Sunglasses",
];

const POPULAR = [
  "shirts for men",
  "jeans for men",
  "trousers for men",
  "white shirt",
  "black shirt",
  "overshirt men",
  "baggy jeans",
  "straight fit jeans",
  "bootcut jeans",
  "korean pants",
  "gurkha pants",
  "cargo pants",
  "linen shirts",
  "denim shirts",
  "formal shirts",
  "crochet shirts",
  "striped shirts",
  "printed shirts",
  "formal pants for men",
  "concert outfits men",
  "club wear for men",
  "bootcut jeans for men",
  "office wear shirts",
  "korean pants for men",
  "sunglasses for men",
  "perfume for men",
  "polo t-shirts",
  "oversized t-shirts",
  "korean trousers",
  "baggy pants men",
  "linen pants",
  "chinos for men",
  "striped shirt men",
  "embroidery shirt men",
  "chelsea boots men",
  "sling bag for men",
  "cotton shirts for men",
  "kurta for men",
];

const ACCESSORIES = [
  "Ravenwood Braided Bracelet",
  "EternaWrap Black Braclet",
  "Obsidian Blue Braided Bracelet",
  "Rustic Revolve Brown Braided Braclet",
  "Divine Skull Cross Chain",
  "Bar of Luxe Chain",
  "Rogue Bullet Pendant",
  "Pirate's Anchor Steel Chain",
  "Debonair Black Bracelet",
  "Solid Block SS Chain",
  "Hyphenated Weave Braided Bracelet",
  "Metal Black Trio Bracelet",
  "Abstract Trio Metal Bracelet",
  "Rattle Square Chain",
  "Blacksmith Nail Braided Bracelet",
  "Duo Gold & Silver SS Chain",
  "Rover Wrap Black Braclet",
  "Mafia SS Chain",
  "Nob Nail Edge Braided Bracelet",
  "Hexa Beads Bracelet",
  "Bold Swirl Bracelet",
  "Grey Cuboid SS Chain",
  "Midnight Eclipse Braid Bracelet",
  "Black Cuboid SS Chain",
  "Wavecrest Dollar Brown Bracelet",
];

const COMPANY = [
  "About Us",
  "Privacy Policy",
  "Terms & Conditions",
  "Return/Exchange Policy",
  "Contact Us",
  "Sitemap",
  "Stakeholders",
];

const LinkGrid = ({ title, items, grid }) => (
  <div className="mb-3 mx-4">
    <h2 className="uppercase text-black text-left mb-1" style={bold}>
      {title}
    </h2>
    <ul className={`grid ${grid} gap-x-2 gap-y-0.5 justify-start list-none p-0 m-0`}>
      {items.map((t, i) => (
        <li key={i} className="text-black text-left py-0.5" style={light}>
          {t}
        </li>
      ))}
    </ul>
  </div>
);

/* ---------- editorial helpers ---------- */
const P = ({ children }) => (
  <p style={{ fontSize: 14, color: "#444", lineHeight: 1.5, marginBottom: 16 }}>{children}</p>
);
const S = ({ children }) => <strong style={{ color: "#000" }}>{children}</strong>;
const UL = ({ children }) => (
  <ul style={{ marginLeft: 20, listStyle: "disc", fontSize: 14, color: "#444", lineHeight: 1.5 }}>
    {children}
  </ul>
);
const LI = ({ children }) => <li style={{ marginBottom: 8 }}>{children}</li>;
const H2 = ({ children }) => (
  <h2 style={{ fontSize: 18, color: "#333", marginBottom: 8, fontWeight: 700 }}>{children}</h2>
);
const Block = ({ children }) => <div style={{ marginBottom: 20 }}>{children}</div>;
const Box = ({ children }) => (
  <div style={{ background: "#f8f8f8", padding: 12, borderRadius: 6, marginTop: 16 }}>
    {children}
  </div>
);

const Editorial = () => (
  <div
    className="px-2 pt-4 pb-8 footer-editorial"
    style={{ fontFamily: FONT, fontSize: 12 }}
    aria-label="Footer Editorial Content"
  >
    <div style={{ marginTop: 20 }}>
      <h2
        style={{
          fontSize: 24,
          color: "#222",
          marginBottom: 12,
          paddingBottom: 8,
          borderBottom: "1px solid #eee",
          fontWeight: 700,
        }}
      >
        The SNITCH Shopping Experience – Where Digital Meets Style
      </h2>
      <P>
        At SNITCH, we redefine the modern shopping experience, merging seamless digital convenience
        with engaging in-store interactions. Whether you're shopping online or visiting our
        immersive retail spaces, we ensure a smooth, stylish, and hassle-free journey that caters to
        today's fashion-forward men.
      </P>
      <P>
        Our direct-to-consumer (D2C) approach eliminates traditional retail barriers, giving you
        complete control over how and where you engage with our trend-driven menswear collections.
        From effortless online browsing to hands-on in-store exploration, SNITCH lets you shop on
        your terms, at your pace.
      </P>

      <Block>
        <H2>Shop Anytime, Anywhere – The Digital Shopping Experience</H2>
        <P>
          <S>🛍️ 24/7 Accessibility – Fashion at Your Fingertips:</S> Gone are the days of
          restrictive store hours. SNITCH online shopping allows you to browse, select, and purchase
          from our curated menswear collections anytime, anywhere. Whether you're searching for
          sharp formalwear, contemporary casual styles, or trend-forward accessories, our website
          provides an intuitive, fast, and stylish experience.
        </P>
        <P>
          <S>Key Features of SNITCH Online Shopping:</S>
        </P>
        <UL>
          <LI>
            ✔ User-Friendly Navigation – Explore categories effortlessly, from joggers and co-ords
            to sunglasses and accessories.
          </LI>
          <LI>
            ✔ AI-Powered Recommendations – Get personalized outfit suggestions based on your style
            preferences.
          </LI>
          <LI>
            ✔ Detailed Product Views – High-quality images, 360-degree views, and fabric close-ups
            ensure zero guesswork when shopping online.
          </LI>
          <LI>
            ✔ Secure &amp; Easy Checkout – Multiple payment options, fast processing, and seamless
            checkout make buying a breeze.
          </LI>
          <LI>
            ✔ Exclusive Online Drops – Stay ahead of trends with limited-edition online-only
            collections.
          </LI>
        </UL>
        <P>
          <S>Style Tip:</S> Need outfit inspiration? Our Lookbook and Shop the Look features help
          you discover effortless styling ideas in just a few clicks.
        </P>
      </Block>

      <Block>
        <H2>Beyond the Screen – The SNITCH In-Store Experience</H2>
        <P>
          <S>🏬 Feel the Fabric, Perfect the Fit – Hands-On Shopping:</S> For those who love a
          tactile experience, SNITCH stores provide an immersive way to engage with premium fabrics,
          tailored fits, and contemporary aesthetics. Step into a space where style meets
          innovation, allowing you to explore textures, colors, and silhouettes in person.
        </P>
        <P>
          <S>Why Visit a SNITCH Store?</S>
        </P>
        <UL>
          <LI>
            ✔ Try Before You Buy – Experience the perfect fit and see how our clothing moves with
            you.
          </LI>
          <LI>
            ✔ Expert Styling Assistance – Our in-store fashion advisors help curate looks that suit
            your personality and occasion.
          </LI>
          <LI>
            ✔ Exclusive In-Store Drops – Discover limited-edition releases and early access to
            upcoming collections.
          </LI>
          <LI>
            ✔ Instant Gratification – No waiting for deliveries—walk in, shop, and step out with
            your favorite menswear picks.
          </LI>
          <LI>
            ✔ Interactive Shopping Spaces – From smart mirrors to personalized fittings, our stores
            are designed for the modern shopper.
          </LI>
        </UL>
        <P>
          <S>Pro Tip:</S> Try on our best-selling co-ord sets or oversized t-shirts in-store to
          experience their premium feel and flawless fit firsthand.
        </P>
      </Block>

      <Block>
        <H2>SNITCH Seasonal Collections – Year-Round Style Evolution</H2>
        <P>
          <S>🍂 Effortlessly Transition Through Every Season:</S> At SNITCH, we design seasonal
          menswear collections that keep you stylish throughout the year. From lightweight summer
          styles to layered winter essentials, our fashion-forward pieces help you dress
          effortlessly, no matter the occasion or weather.
        </P>
        <P>
          <S>Discover:</S>
        </P>
        <UL>
          <LI>
            ✔ Summer-Ready Looks – Breezy cotton shirts, linen co-ords, and lightweight joggers for
            a cool, casual aesthetic.
          </LI>
          <LI>
            ✔ Monsoon Essentials – Water-resistant jackets, jogger track pants, and quick-dry
            fabrics for unpredictable weather.
          </LI>
          <LI>
            ✔ Winter Warmth – Layered outerwear, full-sleeve tees, and hooded jackets that blend
            comfort and style.
          </LI>
          <LI>
            ✔ Year-Round Staples – Classic black joggers, minimalist co-ords, and structured tees
            designed to adapt across seasons.
          </LI>
        </UL>
        <P>
          <S>Style Tip:</S> Invest in versatile neutrals like beige co-ords and grey joggers, which
          seamlessly transition between seasons and events.
        </P>
      </Block>

      <Block>
        <H2>Omnichannel Shopping – The Best of Both Worlds</H2>
        <P>
          <S>🔄 Seamless Shopping with SNITCH's Unified Retail Strategy:</S> Our omnichannel
          approach ensures you can shop whenever, wherever, and however you prefer. Whether you love
          the convenience of online shopping or prefer the tactile experience of in-store purchases,
          SNITCH brings you the best of both worlds.
        </P>
        <UL>
          <LI>🔗 Shop Online – Browse and buy with doorstep delivery.</LI>
          <LI>🏬 Visit a Store – Experience our collections in person with expert guidance.</LI>
          <LI>📦 Click &amp; Collect – Order online, pick up at a store near you.</LI>
          <LI>🔁 Easy Returns &amp; Exchanges – Hassle-free, whether online or in-store.</LI>
        </UL>
      </Block>

      <Box>
        <H2>Why Shop at SNITCH?</H2>
        <UL>
          <LI>✔ Contemporary Menswear That Keeps Up with You</LI>
          <LI>✔ Effortless Online &amp; In-Store Shopping Experience</LI>
          <LI>✔ Premium Fabrics, Trend-Driven Designs, &amp; Smart Tailoring</LI>
          <LI>✔ Seamless Omnichannel Flexibility – Shop Anywhere, Anytime</LI>
          <LI>✔ Fashion for Every Season, Occasion &amp; Mood</LI>
        </UL>
        <P>
          Your wardrobe should work as hard as you do. SNITCH makes fashion easy, exciting, and
          accessible—whether you're scrolling from your couch or styling in-store.
        </P>
      </Box>

      <Box>
        <H2>Upgrade Your Shopping Experience – Explore SNITCH Today!</H2>
        <P>
          Ready to redefine your wardrobe? Shop the latest men's fashion online or visit your
          nearest store for a hands-on experience. From effortless joggers and co-ords to bold
          sunglasses and statement accessories, SNITCH has it all.
        </P>
        <P>🔥 Stay ahead of trends. Elevate your style. Shop SNITCH now! 🔥</P>
      </Box>
    </div>
  </div>
);

/* ---------- social icons ---------- */
const fill = { fill: "var(--snitch-primary)" };
const Social = ({ label, children }) => (
  <li className="p-2 mx-1 md:mx-2" aria-label={label} title={label}>
    <span>{children}</span>
  </li>
);

/* ---------- app badges (simplified; paste the original SVGs for pixel-exact badges) ---------- */
const Badge = ({ title, small, big, icon }) => (
  <li
    className="m-3"
    title={title}
    style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: "#000",
      color: "#fff",
      border: "1px solid #a6a6a6",
      borderRadius: 6,
      height: 32,
      width: 107,
      padding: "0 8px",
    }}
  >
    {icon}
    <span>
      <small style={{ display: "block", fontSize: 6, lineHeight: 1 }}>{small}</small>
      <b style={{ display: "block", fontSize: 11, lineHeight: 1.1, fontFamily: FONT }}>{big}</b>
    </span>
  </li>
);

export default function SnitchFooter() {
  return (
    <div
      id="site-footer"
      className="w-full pb-20 md:pb-6"
      style={{ "--snitch-primary": COLORS.primary, "--snitch-footer-bg": COLORS.footerBg }}
    >
      <div className="w-full">
        <div
          className="w-full px-4 py-1 pb-12 md:px-8 md:py-8"
          style={{ backgroundColor: "var(--snitch-footer-bg)" }}
        >
          <div className="flex justify-between items-center px-4 py-2">
            <h1 style={{ fontFamily: FONT, fontSize: 16, fontWeight: 700 }}>
              More about shopping <span className="capitalize"> At Snitch</span> for men
            </h1>
          </div>
          <br />
          <LinkGrid
            title="Top Categories"
            items={CATEGORIES}
            grid="grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7"
          />
          <br />
          <LinkGrid
            title="Popular Searches"
            items={POPULAR}
            grid="grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7"
          />
          <br />
          <LinkGrid
            title="Most Popular Accessories"
            items={ACCESSORIES}
            grid="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          />

          <Editorial />

          <LinkGrid
            title="Company"
            items={COMPANY}
            grid="grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7"
          />

          <ul className="flex justify-center py-4 md:py-6 list-none m-0">
            <Social label="Snitch Facebook">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  style={fill}
                  d="M18.764 9.493c0 4.682-3.436 8.564-7.92 9.269v-6.539h2.18l.416-2.705h-2.596V7.763c0-.74.363-1.461 1.524-1.461h1.18V3.999s-1.07-.183-2.094-.183c-2.138 0-3.534 1.295-3.534 3.64v2.061H5.544v2.706H7.92v6.538C3.436 18.056 0 14.175 0 9.493a9.382 9.382 0 0 1 18.764 0Z"
                />
              </svg>
            </Social>
            <Social label="Snitch Instagram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  style={fill}
                  d="M7.019 9.436a3.127 3.127 0 1 1 6.254 0 3.127 3.127 0 0 1-6.254 0Zm-1.691 0a4.817 4.817 0 1 0 9.635 0 4.817 4.817 0 0 0-9.635 0Zm8.7-5.008a1.126 1.126 0 1 0 2.253 0 1.126 1.126 0 0 0-2.253 0ZM6.355 17.073c-.915-.042-1.412-.194-1.742-.323a2.917 2.917 0 0 1-1.08-.702 2.9 2.9 0 0 1-.701-1.078c-.13-.33-.281-.828-.323-1.743-.046-.989-.055-1.286-.055-3.791s.01-2.802.055-3.791c.042-.915.195-1.411.323-1.743.17-.438.373-.75.702-1.079.328-.328.64-.532 1.079-.701.33-.13.827-.282 1.742-.323.989-.046 1.286-.055 3.79-.055 2.506 0 2.802.01 3.792.055.915.041 1.411.194 1.742.323.438.17.75.373 1.08.701.327.328.53.641.701 1.08.129.33.281.827.323 1.742.045.99.054 1.286.054 3.791s-.009 2.802-.054 3.791c-.042.915-.195 1.412-.323 1.743-.17.438-.374.75-.702 1.078a2.911 2.911 0 0 1-1.079.702c-.33.129-.827.28-1.742.323-.99.045-1.286.054-3.791.054s-2.802-.009-3.791-.054ZM6.278.11C5.278.157 4.597.315 4 .547c-.617.24-1.14.56-1.662 1.082a4.591 4.591 0 0 0-1.082 1.662c-.232.596-.39 1.278-.435 2.277-.047 1-.057 1.32-.057 3.868s.01 2.868.057 3.868c.045.999.203 1.68.435 2.277.24.617.56 1.14 1.082 1.662A4.6 4.6 0 0 0 4 18.325c.598.232 1.279.39 2.278.436 1 .046 1.32.057 3.868.057s2.867-.01 3.867-.057c1-.045 1.681-.204 2.278-.436.617-.24 1.14-.56 1.662-1.082a4.607 4.607 0 0 0 1.082-1.662c.232-.596.39-1.278.436-2.277.045-1.001.056-1.32.056-3.868s-.011-2.868-.056-3.868c-.046-.999-.204-1.68-.436-2.277a4.614 4.614 0 0 0-1.082-1.662A4.601 4.601 0 0 0 16.29.547C15.694.315 15.012.156 14.014.11c-1-.045-1.32-.057-3.868-.057S7.28.064 6.278.111Z"
                />
              </svg>
            </Social>
            <Social label="Snitch LinkedIn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  style={fill}
                  d="M17.697 1.408H2.303A1.319 1.319 0 0 0 .97 2.71v15.455a1.319 1.319 0 0 0 1.333 1.3h15.393a1.322 1.322 0 0 0 1.332-1.304V2.706a1.321 1.321 0 0 0-1.332-1.298Z"
                />
                <path
                  style={{ fill: "var(--snitch-footer-bg)" }}
                  d="M3.644 8.176h2.68V16.8h-2.68V8.176Zm1.341-4.292a1.554 1.554 0 1 1 0 3.108 1.554 1.554 0 0 1 0-3.108Zm3.021 4.292h2.57V9.36h.035c.358-.678 1.232-1.393 2.536-1.393 2.714-.006 3.217 1.78 3.217 4.097V16.8h-2.68v-4.196c0-.999-.018-2.285-1.393-2.285s-1.609 1.09-1.609 2.22V16.8H8.006V8.176Z"
                />
              </svg>
            </Social>
            <Social label="Snitch website">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  style={fill}
                  d="M10.229 11.207V8.643h8.638c.085.447.128.975.128 1.547 0 1.924-.525 4.302-2.22 5.996-1.648 1.716-3.753 2.632-6.543 2.632-5.17 0-9.519-4.212-9.519-9.382S5.061.054 10.232.054c2.86 0 4.898 1.123 6.429 2.586l-1.81 1.808c-1.097-1.03-2.585-1.83-4.622-1.83C6.454 2.618 3.5 5.66 3.5 9.436c0 3.775 2.953 6.818 6.728 6.818 2.449 0 3.843-.983 4.737-1.877.725-.725 1.202-1.76 1.39-3.173l-6.127.003Z"
                />
              </svg>
            </Social>
          </ul>

          <h2 className="uppercase text-black text-center mx-2 py-2" style={bold}>
            Download App
          </h2>
          <ul className="flex justify-center pb-10 list-none m-0 p-0">
            <Badge
              title="app-store"
              small="Download on the"
              big="App Store"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
                  <path d="M16.4 12.7c0-2.5 2.1-3.7 2.2-3.8-1.2-1.7-3-2-3.7-2-1.6-.2-3.1.9-3.9.9s-2-.9-3.3-.9c-1.7 0-3.3 1-4.1 2.5-1.8 3.1-.5 7.6 1.2 10.1.9 1.2 1.9 2.6 3.2 2.5 1.3-.1 1.8-.8 3.3-.8s1.9.8 3.3.8c1.4 0 2.2-1.2 3-2.4 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.8-1-2.8-4zM13.9 5.2c.7-.9 1.2-2 1.1-3.2-1 0-2.3.6-3 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.5 2.9-1.3z" />
                </svg>
              }
            />
            <Badge
              title="play-store"
              small="GET IT ON"
              big="Google Play"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path fill="#00A0FF" d="M3 2.5v19l10-9.5z" />
                  <path fill="#FFE000" d="M17 8.5l4 2.3c1.1.6 1.1 1.8 0 2.4L17 15.5 13 12z" />
                  <path fill="#FF3A44" d="M3 21.5l10-9.5 4 3.5-11.500 6.600c-1 .5-2 .2-2.500-.6z" />
                  <path fill="#00F076" d="M3 2.5c.5-.8 1.5-1.100 2.500-.6L17 8.500 13 12z" />
                </svg>
              }
            />
          </ul>
        </div>
      </div>
    </div>
  );
}