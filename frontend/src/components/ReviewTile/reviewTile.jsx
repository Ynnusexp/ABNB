export default function ReviewTile(props){
    return (
        <div>
            <div className="user-name">
            {props.review.userId}
            </div>
            <div className="date">
            {Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(props.review.createdAt.split("-")[1]))} {props.review.createdAt.split("-")[0]}
            </div>
            <div className="review">
              <p>{props.review.review}</p>
            </div>
        </div>

    )
}
