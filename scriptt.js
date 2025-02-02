document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    
    // Adding hover effect to sections
    sections.forEach(section => {
        section.addEventListener('mouseover', () => {
            section.style.transform = 'scale(1.05)';
            section.style.transition = 'transform 0.3s';
        });
        section.addEventListener('mouseout', () => {
            section.style.transform = 'scale(1)';
        });
    });

    // Modal functionality
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modal-text');
    const span = document.getElementsByClassName('close')[0];

    sections.forEach(section => {
        section.addEventListener('click', () => {
            modalText.innerText = section.innerText;
            modal.style.display = 'block';
        });
    });

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Three.js setup
    const container = document.getElementById('3d-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x005eb8 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = function () {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
});