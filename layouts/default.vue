<template>
    <div>
        <header>
            <nav>
                <Header />
            </nav>
        </header>
        <div>
            <slot />
        </div>
    </div>
</template>

<style scoped>
* {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
}
</style>