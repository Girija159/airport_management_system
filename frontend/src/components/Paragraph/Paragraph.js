import styles from './Paragraph.module.css';

const Paragraph = props => {
    return (
        <div className={styles.paragraph}>
            <p> {props.paragraph} </p>
        </div>
    )
}

export default Paragraph;