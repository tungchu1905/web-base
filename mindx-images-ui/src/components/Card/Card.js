import {Card as BCard} from 'react-bootstrap'
import './Card.css'

function Card(props) {
    const { imageUrl, title, description, createdBy, note } = props
    return (
        <BCard>
            <BCard.Img variant="top" src={imageUrl} />
            <BCard.Body>
                <BCard.Title>{title}</BCard.Title>
                <BCard.Text>
                    {description}
                </BCard.Text>
                <BCard.Text>
                    {note}
                </BCard.Text>
            </BCard.Body>
        </BCard>
    )
}
export default Card