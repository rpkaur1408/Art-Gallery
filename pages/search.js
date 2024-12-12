import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";

export default function AdvancedSearch() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const submitForm = (data) => {
    // Construct query string
    const queryParams = [];

    if (data.searchBy) {
      queryParams.push(`searchBy=${encodeURIComponent(data.searchBy)}`);
    }
    if (data.geoLocation) {
      queryParams.push(`geoLocation=${encodeURIComponent(data.geoLocation)}`);
    }
    if (data.medium) {
      queryParams.push(`medium=${encodeURIComponent(data.medium)}`);
    }
    if (data.isOnView) {
      queryParams.push(`isOnView=true`);
    }
    if (data.isHighlight) {
      queryParams.push(`isHighlight=true`);
    }
    if (data.q) {
      queryParams.push(`q=${encodeURIComponent(data.q)}`);
    }

    const queryString = queryParams.join("&");

    if (queryString) {
      setSearchHistory((current) =>
        Array.isArray(current) ? [...current, queryString] : [queryString]
      );
      router.push(`/artwork?${queryString}`);
    }
  };

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Search Query</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your search query"
              {...register("q", { required: "Search query is required." })}
              className={errors.q ? "is-invalid" : ""}
            />
            <Form.Control.Feedback type="invalid">
              {errors.q?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Search By</Form.Label>
            <Form.Select {...register("searchBy")}>
              <option value="title">Title</option>
              <option value="tags">Tags</option>
              <option value="artistOrCulture">Artist or Culture</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Geo Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a geographic location"
              {...register("geoLocation")}
            />
            <Form.Text className="text-muted">
              Case Sensitive String, with multiple values separated by the | operator.
            </Form.Text>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Medium</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter an art medium"
              {...register("medium")}
            />
            <Form.Text className="text-muted">
              Case Sensitive String, with multiple values separated by the | operator.
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Highlighted"
              {...register("isHighlight")}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Currently on View"
              {...register("isOnView")}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
}