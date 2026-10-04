import Accordion from "../components/SingleProduct/Accordion.jsx";
import AddButton from "../components/SingleProduct/AddButton.jsx";
import AskSid from "../components/SingleProduct/Askid.jsx";
import ColorSelector from "../components/SingleProduct/ColorSelector.jsx";
import ProductData from "../components/SingleProduct/ProductData.jsx";
import ProductHeader from "../components/SingleProduct/ProductHeader.jsx";
import ProductGallery from "../components/SingleProduct/ProductsGallery.jsx";
import SizeSelector from "../components/SingleProduct/SizeSelector.jsx";

export default function SingleProductPage({ product = ProductData }) {
  const p = product;

  return (
    <main className="flex flex-col bg-white md:flex-row md:pb-10">
      <ProductGallery images={p.images} />

      <div className="w-full md:w-[45%] lg:w-[40%] md:sticky md:top-[60px] md:self-start md:px-5">
        <ProductHeader p={p} />
        <ColorSelector colors={p.colors} selected={p.selectedColor} />
        <SizeSelector sizes={p.sizes} />

        <div className="hidden md:block pb-2"><AddButton /></div>

        <div className="my-4 border-t">
          <Accordion title="Delivery" open>
            <div className="flex justify-between border border-[#b8b8b8] px-5 py-1.5">
              <input type="tel" placeholder="Enter Pincode" className="flex-1 bg-transparent text-xs outline-none" />
              <button className="font-bold text-[#e54b29]">CHECK</button>
            </div>
            <p className="mt-3 bg-[#F5A593] px-4 py-2 text-[#333]">Please select your size to check delivery date</p>
          </Accordion>

          <Accordion title="Description & Fit">
            <p className="text-black/60">{p.description}</p>
            {Object.entries(p.details).map(([title, lines]) => (
              <div key={title} className="pt-3">
                <p>{title}</p>
                {lines.map((l) => <p key={l} className="font-light text-black/60">{l}</p>)}
              </div>
            ))}
            <p className="pt-3 font-bold">SKU: {p.sku}</p>
          </Accordion>

          <Accordion title="Reviews">
            <p className="text-xs font-light">
              No reviews for this style yet. Our Shirts are rated <b>5 stars</b> by shoppers.
            </p>
          </Accordion>

          <Accordion title="Returns">
            {p.returns.map((t, i) => (
              <p key={i} className="py-1 font-light">{i + 1}. {t}</p>
            ))}
          </Accordion>
        </div>

        <AskSid />
      </div>

      {/* mobile sticky button */}
      <div className="fixed bottom-0 w-full max-w-[480px] p-4 md:hidden"><AddButton /></div>
    </main>
  );
}