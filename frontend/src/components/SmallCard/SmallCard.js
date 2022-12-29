import styles from './SmallCard.module.css';

const SmallCard = props => {
    const onClick = () => {
        props.onClick(props.id);
    };

    return (
        <div 
            id={props.id} 
            className={styles[props.className]} 
            disabled={props.disabled} 
            onClick={onClick}
        >
            {props.children}
        </div>
    )
}

export default SmallCard;
