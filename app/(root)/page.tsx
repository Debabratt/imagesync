import { Collection } from "@/components/shared/Collection";
import { navLinks } from "@/constants";
import { getAllImages } from "@/lib/actions/image.actions";
import Image from "next/image";
import Link from "next/link";

interface SearchParamProps {
  searchParams: {
    page?: string;
    query?: string;
  };
}

const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';

  let images;
  try {
    images = await getAllImages({ page, searchQuery });
  } catch (error) {
    console.error("Failed to fetch images", error);
    images = { data: [], totalPage: 1 }; // Fallback to empty data if there's an error
  }

  return (
    <>
      <section className="home">
        <h1 className="home-heading">

        Elevate Your Creativity with ImageSync
        </h1>
        <ul className="flex-center w-full gap-20">
          {navLinks.slice(1, 5).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="flex-center flex-col gap-2"
            >
              <li className="flex-center w-fit rounded-full bg-slate-100 p-4">
                <Image src={link.icon} alt="image" width={24} height={24} />
              </li>
              <p className="p-14-medium text-center text-black">{link.label}</p>
            </Link>
          ))}
        </ul>
      </section>

      <section className="sm:mt-12">
        <Collection 
          hasSearch={true}
          images={images?.data || []}
          totalPages={images?.totalPage || 1}
          page={page}
        />
      </section>
    </>
  );
}

export default Home;
