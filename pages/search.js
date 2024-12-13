import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store";
import { addToHistory } from "../lib/userData";

function AdvancedSearch() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    const submitForm = async (data) => {
        let queryString = "";

        queryString += data.searchBy ? `searchBy=${encodeURIComponent(data.searchBy)}` : "";
        queryString += data.geoLocation ? `&geoLocation=${encodeURIComponent(data.geoLocation)}` : "";
        queryString += data.medium ? `&medium=${encodeURIComponent(data.medium)}` : "";
        queryString += `&isOnView=${data.currentlyOnView ? "true" : "false"}`;
        queryString += `&isHighlighted=${data.highlighted ? "true" : "false"}`;
        queryString += data.q ? `&q=${encodeURIComponent(data.q)}` : "";

        if (queryString) {
            const updatedHistory = await addToHistory(queryString);
            setSearchHistory(updatedHistory);
            router.push(`/artwork?${queryString}`);
        }
    };

    return (
        <Form onSubmit={handleSubmit(submitForm)} className="advanced-search-form">
            <Row>
                <Col md={12}>
                    <Form.Group controlId="q">
                        <br />
                        <Form.Label>Search Query</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter search term"
                            {...register("q", { required: "This field is required." })}
                            isInvalid={!!errors.q}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.q?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <br />
            <Row>
                <Col md={4}>
                    <Form.Group controlId="searchBy">
                        <Form.Label>Search By</Form.Label>
                        <Form.Control as="select" {...register("searchBy")}>
                            <option value="title">Title</option>
                            <option value="tags">Tags</option>
                            <option value="artistOrCulture">Artist or Culture</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="geoLocation">
                        <Form.Label>Geo Location</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter geo location"
                            {...register("geoLocation")}
                        />
                        <Form.Text className="text-muted">
                            Case Sensitive String (i.e. &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;), with multiple values separated by the | operator.
                        </Form.Text>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="medium">
                        <Form.Label>Medium</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter medium"
                            {...register("medium")}
                        />
                        <Form.Text className="text-muted">
                            Case Sensitive String (i.e. &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;), with multiple values separated by the | operator.
                        </Form.Text>
                    </Form.Group>
                </Col>
            </Row>
            <br />
            <Row>
                <Col md={6}>
                    <Form.Group controlId="highlighted">
                        <Form.Check
                            type="checkbox"
                            label="Highlighted"
                            {...register("highlighted")}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group controlId="currentlyOnView">
                        <Form.Check
                            type="checkbox"
                            label="Currently on View"
                            {...register("currentlyOnView")}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <br />
            <Button type="submit" variant="primary">Submit</Button>
        </Form>
    );
}

export default AdvancedSearch;