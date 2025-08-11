import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Row, Col, Form, Button } from "react-bootstrap";

import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/lib/userData"; 

export default function AdvancedSearch() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const [, setSearchHistory] = useAtom(searchHistoryAtom); 

  const submitForm = async (data) => { 
    let queryString = `searchBy=${data.searchBy}`;
    if (data.geoLocation) queryString += `&geoLocation=${data.geoLocation}`;
    if (data.medium) queryString += `&medium=${data.medium}`;
    queryString += `&isOnView=${data.isOnView}`;
    queryString += `&isHighlight=${data.isHighlight}`;
    queryString += `&q=${data.q}`;

    setSearchHistory(await addToHistory(queryString));

    router.push(`/artwork?${queryString}`);
  };

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label>Search Query</Form.Label>
            <Form.Control
              type="text"
              {...register("q", { required: true })}
              className={errors.q ? "is-invalid" : ""}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md>
          <Form.Group>
            <Form.Label>Search By</Form.Label>
            <Form.Select {...register("searchBy")}>
              <option value="title">Title</option>
              <option value="tags">Tags</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md>
          <Form.Group>
            <Form.Label>Geo Location</Form.Label>
            <Form.Control type="text" {...register("geoLocation")} />
            <Form.Text className="text-muted">
              Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), 
              with multiple values separated by the | operator
            </Form.Text>
          </Form.Group>
        </Col>

        <Col md>
          <Form.Group>
            <Form.Label>Medium</Form.Label>
            <Form.Control type="text" {...register("medium")} />
            <Form.Text className="text-muted">
              Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, 
              &quot;Textiles&quot;, etc.), with multiple values separated by the | operator
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Check type="checkbox" label="Highlighted" {...register("isHighlight")} />
        <Form.Check type="checkbox" label="Currently on View" {...register("isOnView")} />
      </Form.Group>

      <Button type="submit" variant="dark">Submit</Button>
    </Form>
  );
}

