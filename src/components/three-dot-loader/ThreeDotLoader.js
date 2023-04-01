import './ThreeDotLoader.scss';

export const ThreeDotLoader = () => {
    return (
        <div className='position-absolute threedots__loader'>
            <div className="spinner">
                <div className="bounce1" />
                <div className="bounce2" />
                <div className="bounce3" />
            </div>
        </div>
    )
}

export default ThreeDotLoader;