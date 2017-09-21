import Home from '@/components/paginas/Home.vue'
import Catalogo from '@/components/paginas/Catalogo.vue'
import Producto from '@/components/paginas/Producto.vue'
import UserPage from '@/components/paginas/UserPage.vue'
import Checkout from '@/components/paginas/Checkout.vue'
import Gracias from '@/components/paginas/Gracias.vue'

const routes = [
	{path: '/' ,component: Home, name:'home'},
	{path: '/catalogo/:categoria/' ,component: Catalogo, name:'catalogo'},
	{path: '/producto/:slug/' ,component: Producto, name:'productoSingle'},
	{path: '/cuenta/' ,component: UserPage, name:'perfil'},
	{path: '/checkout/' ,component: Checkout, name:'checkout'},
	{path: '/felicidades/:pedido/' ,component: Gracias, name:'gracias'},

]

export default routes