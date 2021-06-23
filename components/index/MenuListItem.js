import Link from 'next/link';
import { FaAngleDoubleRight } from 'react-icons/fa';

export default function MenuListItem({ url, title }) {
    return (
        <Link href={url}>
            <a href="#" className="list-group-item d-flex justify-content-between align-items-center">
                <div className="py-1">
                    <div className="fs-5 fw-bold">{title}</div>
                </div>
                <div>
                    <FaAngleDoubleRight />
                </div>
            </a>
        </Link>
    );
};




