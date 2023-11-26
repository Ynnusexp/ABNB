export default function ReviewTile(props){
    console.log(props)
    return (
        <div>
            <div className="user-name">
            {props.review.userId}
            </div>
            <div className="date">
            {props.review.createdAt}
            </div>
            <div className="review">
              <p>{props.review.review}</p>
            </div>
        </div>

    )
}
