import "./ErasmusBenefits.css"
import students from "../assets/images/erasmusbenefits.jpg";

function ErasmusBenefits(){
    return(
        <div className="benefits-container">
            <h1>Get an Advantage</h1>
            <p>Erasmus+ helps in developing highly valued soft skills such as adaptability, problem-solving, 
                and international networking, which are crucial in the global job market. Moreover, 
                students can combine academic study with traineeships to gain practical work experience.
                You can click on the image below to be redirect to TU Dublins information page on Erasmus.</p>
            <a href="https://www.tudublin.ie/study/international-students/study-abroad-and-erasmus/erasmus-plus-at-tu-dublin/" target="_blank" rel="noopener noreferrer">
                <img src={students} alt="students" className="students" />
            </a>
            <h1>Learn Independence</h1>
            <p>Living on your own provides a unique opportunity for self-discovery. 
                You get to explore your personal preferences, habits, and lifestyle choices without the influence of others.
                You make all the decisions about your living space and lifestyle, which can boost your confidence and decision-making skills.
                Living alone in student communities can offer networking opportunities with neighbors who may be attending the same university or college.</p>

            <h1>Experience Future Possibilities</h1>
            <p>The Erasmus experience can be a test ground for students considering long-term travel or moving to another country for work or study. 
                It offers a glimpse into what an international career might entail and can provide clarity on future life choices.
                Participating in Erasmus can significantly improve communication skills in a foreign language. Immersion in a different linguistic environment 
                is the perfect setting for learning a new language or enhancing existing language abilities</p>
            
                <div class="video-responsive">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/qmTia3pXCLA?si=jdD0q3LUjHUz_T9c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>

        </div>
    )
}

export default ErasmusBenefits;