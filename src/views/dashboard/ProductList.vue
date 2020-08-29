<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <!--ADD BTN-->
    <div class="d-flex justify-content-sm-end">
      <button
        class="btn bnt-lg btn-secondary my-3"
        @click.prevent="openModal(null, true, 'detailModal')"
      >
        建立新商品
      </button>
    </div>
    <!--TABLE-->
    <table class="table table-hover">
      <thead>
        <tr>
          <th>分類</th>
          <th>名稱</th>
          <th>商品編號</th>
          <th width="150">原價</th>
          <th width="150">售價</th>
          <th width="100">是否啟用</th>
          <th width="150">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <th>{{ product.category | cat }}</th>
          <td>{{ product.title }}</td>
          <td>
            <small>{{ product.id }}</small>
          </td>
          <td class="text-right">{{ product.origin_price | currency }}</td>
          <td class="text-right">{{ product.price | currency }}</td>
          <td>
            <span class="text-success" v-if="product.is_enabled === '1'">已啟用</span>
            <span class="text-danger" v-else>未啟用</span>
          </td>
          <td class="d-flex">
            <button
              class="btn btn-sm btn-secondary mr-1"
              @click.prevent="openModal(product, false, 'detailModal')"
            >
              編輯
            </button>
            <button
              class="btn btn-sm btn-outline-danger"
              @click.prevent="openModal(product, false, 'deleteModal')"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!--Pagination-->
    <div class="row d-flex justify-content-sm-center">
      <Pagination :pages="pagination" v-on:change-page="getProducts" />
    </div>
    <!--MODAL-->
    <div class="modal fade" tabindex="-1" id="detailModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="row">
                <div class="col-md-4">
                  <form>
                    <div class="form-group">
                      <label for="imgUrl">輸入圖片網址</label>
                      <input
                        v-model="tempProduct.imageUrl"
                        type="url"
                        class="form-control"
                        id="imgUrl"
                      />
                    </div>
                    <div class="form-group">
                      <label for="imgUpload">或 上傳圖片</label>
                      <input
                        type="file"
                        ref="files"
                        class="form-control"
                        id="imgUpload"
                        @change="uploadFile"
                      />
                    </div>
                    <img :src="tempProduct.imageUrl" class="img-fluid" alt="" />
                  </form>
                </div>
                <div class="col-md-8">
                  <div class="form-group">
                    <label for="productTitle">商品標題</label>
                    <input
                      v-model="tempProduct.title"
                      type="text"
                      class="form-control"
                      id="productTitle"
                    />
                  </div>
                  <div class="form-row">
                    <div class="col">
                      <div class="form-group">
                        <label for="productCat">分類</label>
                        <input
                          v-model="tempProduct.category"
                          type="text"
                          class="form-control"
                          id="productCat"
                        />
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-group">
                        <label for="productUnit">單位</label>
                        <input
                          v-model="tempProduct.unit"
                          type="text"
                          class="form-control"
                          id="productUnit"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col">
                      <div class="form-group">
                        <label for="originPrice">原價</label>
                        <input
                          v-model="tempProduct.origin_price"
                          type="text"
                          class="form-control"
                          id="originPrice"
                        />
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-group">
                        <label for="CurrentPrice">售價</label>
                        <input
                          v-model="tempProduct.price"
                          type="text"
                          class="form-control"
                          id="CurrentPrice"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="description">商品描述</label>
                    <textarea
                      v-model="tempProduct.description"
                      class="form-control"
                      id="description"
                      rows="3"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label for="content">商品內容</label>
                    <textarea
                      v-model="tempProduct.content"
                      class="form-control"
                      id="content"
                      rows="3"
                    ></textarea>
                  </div>
                  <div class="custom-control custom-checkbox">
                    <input
                      v-model="tempProduct.is_enabled"
                      true-value="1"
                      false-value="0"
                      type="checkbox"
                      class="custom-control-input"
                      id="enable"
                    />
                    <label class="custom-control-label" for="enable">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click.prevent="updateProduct">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--DELETE MODAL-->
    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white font-weight-bold">
            <h5 class="modal-title" id="deleteModalLabel">
              刪除商品
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>
              確定要刪除 商品:
              <span class="text-danger font-weight-bolder">{{ tempProduct.title }}</span> 嗎?
            </p>
            <p class="text-danger">(刪除後無法復原)</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button
              type="button"
              class="btn btn-danger"
              @click.prevent="deleteProduct(tempProduct)"
            >
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- END-->
  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '@/components/pagination.vue';

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isShow: false,
      isNew: true,
      isLoading: false,
    };
  },
  components: { Pagination },
  methods: {
    getProducts(page = 1) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/products?page=${page}`;

      vm.$http.get(api).then((response) => {
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },
    openModal(product, isNew, modalId) {
      const vm = this;

      if (isNew) {
        vm.isNew = true;
        vm.tempProduct = {};
        $(`#${modalId}`).modal('show');
      } else {
        vm.tempProduct = { ...product };
        vm.isNew = false;
        $(`#${modalId}`).modal('show');
      }
    },
    updateProduct() {
      $('#detailModal').modal('hide');
      const vm = this;
      let method = 'put';
      const { id } = vm.tempProduct;
      let api;

      if (vm.isNew) {
        method = 'post';
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/product/`;
      } else {
        method = 'put';
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/product/${id}`;
      }

      vm.$http[method](api, { data: vm.tempProduct }).then((response) => {
        if (response.data.success) {
          vm.$bus.$emit('popToast', response.data.success, response.data.message);
        }

        vm.getProducts();
      });
    },
    deleteProduct(product) {
      const vm = this;
      const { id } = product;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/product/${id}`;
      $('#deleteModal').modal('hide');

      vm.$http.delete(api).then((response) => {
        if (response.data.success) {
          vm.$bus.$emit('popToast', false, response.data.message);
        }

        vm.getProducts();
      });
    },
    uploadFile() {
      const uploadFile = this.$refs.files.files[0];
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/upload`;
      const formData = new FormData();
      formData.append('file-to-upload', uploadFile);

      vm.$http
        .post(api, formData, {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.data.success) {
            vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
          } else {
            vm.$bus.$emit('popToast', response.data.success, response.data.message);
          }
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
