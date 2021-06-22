import Link from 'next/link';

export default function MenuListItem({ url, title, subTitle }) {
    return (
        <Link href={url}>
            <a href="#" className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <div className="fs-5 fw-bold">{title}</div>
                    <small>{subTitle}</small>
                </div>
                <div>
                    &gt;&gt;
                </div>
            </a>
        </Link>
    );
};




