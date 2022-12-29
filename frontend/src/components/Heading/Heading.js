import styles from './Heading.module.css';

const Heading = props => {
    const Header = `h${props.header}`;

    return (
        <div className={styles.heading}>
            <Header> {props.heading} </Header>
        </div>
    )
}

export default Heading;