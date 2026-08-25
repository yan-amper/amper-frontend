import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import { ProductPage } from "@/app-pages";
import { buildProductSlug, Product, ProductsApi } from "@/entities";
import { createImagePath, siteUrl } from "@/shared";

// Цены и наличие правит продавец в админке, кеша по всему сайту нет —
// страница товара не должна быть единственным местом, где посетитель
// видит вчерашнюю цену.
export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Фотографии товаров залиты одним размером — 1512×1512, проверено по всем
 * позициям каталога. Часть файлов при этом лежит в JPEG под расширением
 * .webp; на отрисовку это не влияет (браузеры и краулеры определяют формат
 * по содержимому), а размер у них тот же.
 *
 * Размеры объявляем явно: превью в мессенджере верстается до того, как
 * картинка скачается, и без них ссылка секунду «прыгает».
 */
const PRODUCT_IMAGE_SIZE = 1512;

/**
 * Адрес страницы — `<id>-<слаг>`, и resolve'ит её только id.
 * Слаг проверяется отдельно: если он не совпадает с текущим названием
 * товара (продавец переименовал позицию, или ссылку обрезали руками),
 * страница не отдаёт контент по «почти правильному» адресу, а редиректит
 * на канонический. Иначе один товар был бы доступен по бесконечному числу
 * URL — ровно тот дубликат, ради борьбы с которым всё и затевалось.
 */
const loadProduct = async (slug: string): Promise<Product> => {
  const match = /^(\d+)/.exec(slug);
  if (!match) notFound();

  const product = await ProductsApi.getProductById(Number(match[1]));
  if (!product) notFound();

  return product;
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { slug } = await params;
  const product = await loadProduct(slug);

  const path = `/product/${buildProductSlug(product)}`;
  const title = `${product.title} — купить в Таганроге, АКБ центр АМПЕР`;
  const description =
    `${product.title}: ёмкость ${product.capacity} Ач, пусковой ток ` +
    `${product.current} А, полярность ${product.polarity.toLowerCase()}, ` +
    `габариты ${product.longitude}×${product.width}×${product.height} мм. ` +
    `Цена ${product.standardPrice} ₽, со сдачей старого АКБ — ` +
    `${product.priceWithChange} ₽. Гарантия, проверка и установка на месте.`;

  return {
    title,
    description,
    // Канонический адрес абсолютный: относительный поисковик трактует
    // от своего домена.
    alternates: { canonical: `${siteUrl}${path}` },
    openGraph: {
      type: "website",
      locale: "ru_RU",
      siteName: "АМПЕР — аккумуляторный центр",
      title,
      description,
      url: `${siteUrl}${path}`,
      images: [
        {
          url: createImagePath(product.image),
          width: PRODUCT_IMAGE_SIZE,
          height: PRODUCT_IMAGE_SIZE,
          alt: product.title,
        },
      ],
    },
    /**
     * Квадратной картинке нужна карточка summary, а не summary_large_image:
     * широкая обрезает квадрат сверху и снизу, и аккумулятор в превью
     * лишается половины корпуса. Для главной и каталога, где фотографии
     * горизонтальные, широкая карточка остаётся.
     */
    twitter: { card: "summary" },
  };
};

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const product = await loadProduct(slug);

  const canonicalSlug = buildProductSlug(product);
  if (slug !== canonicalSlug) permanentRedirect(`/product/${canonicalSlug}`);

  const path = `/product/${canonicalSlug}`;

  /**
   * В offers стоит standardPrice, а не priceWithChange.
   *
   * priceWithChange привлекательнее, но она условная — действует только
   * при сдаче старого аккумулятора. Цена в разметке обязана совпадать
   * с той, которую человек реально заплатит без дополнительных условий,
   * иначе это расхождение сниппета с фактом: и по правилам поисковиков
   * нарушение, и для покупателя обман. Скидка описана в description.
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${siteUrl}${path}#product`,
        name: product.title,
        sku: String(product.id),
        image: createImagePath(product.image),
        description:
          `Автомобильный аккумулятор ${product.capacity} Ач, пусковой ток ` +
          `${product.current} А, полярность ${product.polarity.toLowerCase()}, ` +
          `габариты ${product.longitude}×${product.width}×${product.height} мм.`,
        brand: { "@type": "Brand", name: product.manufacturer },
        offers: {
          "@type": "Offer",
          url: `${siteUrl}${path}`,
          priceCurrency: "RUB",
          price: product.standardPrice,
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
        },
        additionalProperty: [
          { "@type": "PropertyValue", name: "Ёмкость", value: `${product.capacity} Ач` },
          { "@type": "PropertyValue", name: "Пусковой ток", value: `${product.current} А` },
          { "@type": "PropertyValue", name: "Полярность", value: product.polarity },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Каталог", item: `${siteUrl}/catalog` },
          { "@type": "ListItem", position: 3, name: product.title },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Названия товаров приходят из чужой базы: экранируем «<», чтобы
        // строка вроде "</script>" в названии не закрыла тег досрочно.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ProductPage product={product} />
    </>
  );
};

export default Page;
