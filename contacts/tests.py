from django.test import Client, TestCase
import random
import string


class ContactTest(TestCase):
    """TestClass for Contact model and api"""

    def _get_ramdom_string(self, length=16, email=False):
        """method for generating random string

        Parameters:
            length(int) -> 16: The length of the string
            email(bool) -> False: String return to be as email or not

        return:
            str: Random string value
        """

        random_string = ''
        for i in range(length):
            random_string += random.choice(string.ascii_uppercase +
                                           string.digits)
        if email:
            random_string += '@example.com'
        return random_string.lower()

    def create_sample(self, false=False):
        """Method that return false model data

        Parameter:
            false(bool) -> False: False or True sample data

        return:
            dict: sample dict data for contact model
        """

        data = {}
        data['contact_name'] = self._get_ramdom_string()
        data['contact_phone'] = random.randint(100000000, 9999999999)
        data['contact_email'] = self._get_ramdom_string(email=True)
        data['contact_address'] = self._get_ramdom_string()
        return data

    def setUp(self):
        """Setup client for testing"""
        self.client = Client()
        self.root_url = '/api/v1/contacts/'
        self.index_page = '/'

    def test_index(self):
        """Method for testing index page"""

        response = self.client.get(self.index_page)
        self.assertEqual(response.status_code, 200)

    def test_get_list(self):
        """Method for testing retrieving model data """

        response = self.client.get(self.root_url)
        self.assertEqual(response.status_code, 200)

    def test_post_list(self):
        """Method for testing POST method or create data"""

        params = self.create_sample()
        response = self.client.post(self.root_url, params)
        self.assertEqual(response.status_code, 201)

    def test_put_details(self):
        """Method for testing PUT method"""

        params = self.create_sample()
        data = self.client.post(self.root_url, params)
        update_url = self.root_url + str(data.json()['id']) + '/'
        params['contact_name'] = self.create_sample()['contact_name']
        update_response = self.client.put(update_url, params, 'application/json')
        self.assertEqual(update_response.status_code, 200)

    def test_delete_details(self):
        """Method for testing DELETE method"""

        params = self.create_sample()
        post_response = self.client.post(self.root_url, params)
        delete_url = self.root_url + str(post_response.json()['id']) + '/'
        delete_response = self.client.delete(delete_url, 'application/json')
        self.assertEqual(delete_response.status_code, 204)

    def test_delete_404(self):
        """Method for testing DELETE 404 error"""

        random_id = random.randint(10000, 15000)
        delete_url = self.root_url + str(random_id) + '/'
        test_404 = self.client.delete(delete_url, 'application/json')
        self.assertEqual(test_404.status_code, 404)

    def test_put_404(self):
        """Method for testing PUT 404 error"""

        params = self.create_sample()
        random_id = random.randint(100, 1000)
        update_url = self.root_url + str(random_id) + '/'
        test_404 = self.client.put(update_url, params, 'application/json')
        self.assertEqual(test_404.status_code, 404)

    def test_page_error(self):
        """Method for testing endpoints error"""

        # 404 not found error
        test_resp = self.client.get('/soemthing/')
        self.assertEqual(test_resp.status_code, 404)

        test_resp = self.client.post('/soemthing/')
        self.assertEqual(test_resp.status_code, 404)

        # 405 method not allowed
        test_resp = self.client.post('/')
        self.assertEqual(test_resp.status_code, 405)
