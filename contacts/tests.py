from django.test import TestCase, Client
from contacts.models import Contact
import random
import string


class ContactTest(TestCase):

    def create_sample(self, false=False):
        data = {}
        data['contact_id'] = random.randint(1, 10000)
        if not False:
            data['contact_name'] = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(16)) 
        else:
            data['contact_name'] = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(16)) * 2
        return data

    def setUp(self):
        self.client = Client()

    def test_index(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)

    def test_get_list(self):
        data = self.client.get('/api/v1/contacts/')
        self.assertIsInstance(data.json(), list)
    
    def test_post_list(self):
        params = self.create_sample()
        data = self.client.post('/api/v1/contacts/', params)
        self.assertEqual(data.json(), params)

    def test_put_details(self):
        params = self.create_sample()
        data = self.client.post('/api/v1/contacts/', params)

        params['contact_name'] = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(16))
        new_data = self.client.put('/api/v1/contacts/' + str(params['contact_id']) + '/', data=params, content_type='application/json')

        self.assertEqual(new_data.json(), params)
        self.assertNotEqual(new_data.json(), data)

    def test_delete_details(self):
        params = self.create_sample()
        data = self.client.post('/api/v1/contacts/', params)
        response = self.client.delete('/api/v1/contacts/' + str(params['contact_id']) + '/', content_type='application/json')

        self.assertEqual(response.status_code, 204)

    def test_errors(self):

        # delete 404 test
        test_404 = self.client.delete('/api/v1/contacts/' + str(random.randint(10000, 15000)) + '/', content_type='application/json')
        self.assertEqual(test_404.status_code, 404)

        # put 404 test
        params = self.create_sample()
        test_404 = self.client.put('/api/v1/contacts/' + str(random.randint(10000, 15000)) + '/', data=params, content_type='application/json')
        self.assertEqual(test_404.status_code, 404)

        # post 400 test
        params = self.create_sample()
        params['contact_id'] = 'Hello World'
        test_400 = self.client.post('/api/v1/contacts/', data=params)
        self.assertEqual(test_400.status_code, 400)

    def test_page_error(self):

        # 404 not found error
        test_resp = self.client.get('/soemthing/')
        self.assertEqual(test_resp.status_code, 404)

        test_resp = self.client.post('/soemthing/')
        self.assertEqual(test_resp.status_code, 404)

        # 405 method not allowed
        test_resp = self.client.post('/')
        self.assertEqual(test_resp.status_code, 405)

