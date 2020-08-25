<template>
    <div>
                <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                    <div class="sidebar-sticky pt-3">
                        <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link active" href="#">
                            <span data-feather="home"></span>
                            功能選單 <span class="sr-only">(current)</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <router-link to="/admin/product-list" class="nav-link" href="#">
                            <span data-feather="file"></span>
                            產品列表
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/admin/order-list" class="nav-link" href="#">
                            <span data-feather="shopping-cart"></span>
                            訂單列表
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/admin/coupon-list" class="nav-link" href="#">
                            <span data-feather="users"></span>
                            優惠券
                            </router-link>
                        </li>
                        </ul>

                        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        <span>模擬功能</span>
                        <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
                            <span data-feather="plus-circle"></span>
                        </a>
                        </h6>
                        <ul class="nav flex-column mb-2">
                        <li class="nav-item">
                            <router-link to="/products/all" class="nav-link" href="#">
                            <span data-feather="file-text"></span>
                                前台模擬
                            </router-link>
                        </li>
                        </ul>
                    </div>
                </nav>
    </div>
</template>