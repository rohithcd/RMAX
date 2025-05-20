// Importing built-in dependencies
import { PrismaClient } from "@prisma/client";

// Impoting custom components
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import NewsLayout from "@/layout/NewsLayout";


export default async function NewsPage() {
    const prisma = new PrismaClient();

    const news = await prisma.news.findMany({
        include: {
            image: true
        }
    });

    console.log('News: ', news);

    return (
        <>
            <PageBreadcrumb pageTitle="News" />
            <NewsLayout data={news}/>
        </>
    )
}