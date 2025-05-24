// Importing built-in dependencies
import { PrismaClient } from "@prisma/client";

// Impoting custom components
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CarouselLayout from "@/layout/CarouselLayout";

export default async function CarouselPage() {
    const prisma = new PrismaClient();

    const carouselContents = await prisma.carousel.findMany({
        include: { image: true }
    });

    console.log('Carousel Contents: ', carouselContents);

    return (
        <>
            <PageBreadcrumb pageTitle="Carousel" />
            <CarouselLayout data={carouselContents}/>
        </>
    )
}