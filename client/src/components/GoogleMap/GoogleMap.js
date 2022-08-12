import './GoogleMap.css'

export const GoogleMap = (props)=>{
    return (
        <div key="map" className="gmap" >
        <h2 >Click to search this Location</h2>
        <div>
            <div>
                <iframe key='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114855.62717290668!2d23.249776277023265!3d42.698300707811846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8682cb317bf5%3A0x400a01269bf5e60!2z0KHQvtGE0LjRjw!5e0!3m2!1sbg!2sbg!4v1657441846782!5m2!1sbg!2sbg" ></iframe>
            </div>
        </div>
    </div>
    )
}