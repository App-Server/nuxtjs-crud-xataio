<template>
    <div>
        <header>
            <nav>
                <li><NuxtLink to="/">index</NuxtLink></li>
                <li><NuxtLink to="/videos">Videos</NuxtLink></li>
                <li><NuxtLink to="/videos/favoritos">Favoritos</NuxtLink></li>
                <li><NuxtLink to="/user/create">User Create</NuxtLink></li>
                <li><NuxtLink to="/user">List User</NuxtLink></li>
            </nav>
        </header>
        <div>
            <slot />
        </div>
    </div>
</template>