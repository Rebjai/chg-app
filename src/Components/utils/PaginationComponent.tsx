import { Link } from "react-router-dom";
import { LinksInfoPaginated, MetaInfoPaginated } from "../../Interfaces/paginatedResponse.interface";

interface PaginationComponentProps {
    meta: MetaInfoPaginated,
    links?: LinksInfoPaginated
}

const PaginationComponent = ({ meta, links }: PaginationComponentProps) => {
    if (!meta || !links) {
        return (
            <div className="flex justify-center mt-8">
                -
            </div>)
    }
    const { first, previous, next, last } = links;
    const { currentPage, totalPages } = meta;

    // Calculate the range of pages to display
    const range = [];
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        if (i > 0 && i <= totalPages) {
            range.push(i);
        }
    }

    return (
        <div className="flex justify-center mt-8">
            <ul className="flex">
                {/* First page link */}
                {currentPage > 1 && (
                    <li>
                        <Link
                            to={first}
                            className="px-3 py-1 bg-gray-200 border-gray-400 border-r hover:bg-gray-300"
                        >
                            First
                        </Link>
                    </li>
                )}

                {/* Previous page link */}
                {previous && (
                    <li>
                        <Link
                            to={previous}
                            className="px-3 py-1 bg-gray-200 border-gray-400 border-r hover:bg-gray-300"
                        >
                            Previous
                        </Link>
                    </li>
                )}

                {/* Display page numbers */}
                {range.map((page) => (
                    <li key={page}>
                        <Link
                            to={`${last.split("=")[0]}=${page}`}
                            className={`px-3 py-1 ${currentPage === page
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 border-gray-400 border-r hover:bg-gray-300"
                                }`}
                        >
                            {page}
                        </Link>
                    </li>
                ))}

                {/* Next page link */}
                {next && (
                    <li>
                        <Link
                            to={next}
                            className="px-3 py-1 bg-gray-200 border-gray-400 border-r hover:bg-gray-300"
                        >
                            Next
                        </Link>
                    </li>
                )}

                {/* Last page link */}
                {currentPage !== totalPages && (
                    <li>
                        <Link
                            to={last}
                            className="px-3 py-1 bg-gray-200 border-gray-400 hover:bg-gray-300"
                        >
                            Last
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default PaginationComponent;
