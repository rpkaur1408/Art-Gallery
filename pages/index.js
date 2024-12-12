 
/**************************************************************************** 
*	I declare that this assignment is my own work in accordance with the Seneca Academic * Policy. No part of this assignment has been copied manually or electronically from * any other source (including web sites) or distributed to other students. 
* 
*	https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html 
* 
*	Assignment: 2247 / 6 * Student Name:  Rehatpreet kaur
*	Student Email: your.email@myseneca.ca 
*	Course/Section: WEB422/ZAA * Vercel URL:  https://art-gallery-blue-ten.vercel.app/
* 
*****************************************************************************/ 


import { Row, Col, Image } from 'react-bootstrap';

export default function Home() {
    return (
        <div>
            <Image 
                src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg" 
                alt="Metropolitan Museum of Art" 
                fluid 
                rounded 
            />
            <Row className="mt-4">
                <Col lg={6}>
                    <p>
                        The Metropolitan Museum of Art, colloquially referred to as the Met, is an encyclopedic art museum in New York City. By floor area, it is the fourth-largest museum in the world and the largest art museum in the Americas. With 5.36 million visitors in 2023, it is the most-visited museum in the United States and the fifth-most visited art museum in the world.
                    </p>
                </Col>
                <Col lg={6}>
                    <p>
                        The Metropolitan Museum of Art was founded in 1870 with its mission to bring art and art education to the American people. The museums permanent collection consists of works of art from classical antiquity, ancient Egypt, nearly all European masters, and extensive American and modern art.
                    </p>
                </Col>
                <Col lg={6}>
                    <p>
                        The Fifth Avenue building opened on March 30, 1880. In 2021, despite the COVID-19 pandemic, it attracted 1,958,000 visitors, ranking fourth on the list of most-visited art museums.<br/><br/>

                        <a 
                            href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" 
                            target="_blank" 
                            rel="noreferrer"
                        >
                            https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art
                        </a>
                    </p>
                </Col>
            </Row>
        </div>
    );
}


