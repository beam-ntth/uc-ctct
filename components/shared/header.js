

export default function Header(props) {
    return (
        <div>
            <div>
                <h1>{props.header}</h1>
                <p>{props.date}</p>
            </div>
            <div>
                <img src={props.imgSrc} alt="Profile Image" />
            </div>
        </div>
    )
}