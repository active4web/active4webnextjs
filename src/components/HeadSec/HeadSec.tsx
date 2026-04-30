import "./HeadSec.scss";

const HeadSec = ({ title }: { title: string }) => {
    return (
        <div className="head-sec">
            <h2>{"//"} {title}</h2>
            <span>{title}</span>
        </div>
    );
}

export default HeadSec;