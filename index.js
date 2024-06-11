const students = [
    { name: 'Sara', age: 17, interests: ['music', 'coding' , 'coding', 'Fighting' , 'travling'] },
    { name: 'Anika roy', age: 18, interests: ['sports', 'literature'] },
    { name: 'Moria Tasbiha', age: 16, interests: ['music', 'sports'] },
    { name: 'M Mohammad', age: 19, interests: ['coding', 'literature'] }, 
    { name: 'Abid Hosain Shawon', age: 17, interests: ['coding', 'Fighting' , 'travling'] },
    { name: 'Zubayer Zayed', age: 17, interests: ['coding', 'literature'] },
    { name: 'Mahabuba Akter', age: 17, interests: ['coding', 'literature'] },
    { name: 'Lamia Nazneen', age: 19, interests: ['coding', 'literature'] },
    { name: 'Ahmed Zohayer', age: 18, interests: ['coding', 'literature'] },
    { name: 'Kohinur Akter Banu ', age: 16, interests: ['coding', 'literature'] },
    { name: 'Nazifa Anjum Urbi ', age: 18, interests: ['coding', 'literature'] },
    { name: 'Eid Rahman ', age: 17, interests: ['coding', 'literature'] },
    { name: 'Md Abdul Bari ', age: 18, interests: ['coding', 'literature'] },
    { name: 'Sanjida Akter ', age: 16, interests: ['coding', 'literature'] },
    
];

// Function to calculate similarity score
function calculateSimilarity(interests1, interests2) {
    const commonInterests = interests1.filter(interest => interests2.includes(interest));
    return commonInterests.length;
}

// Function to calculate age proximity score
function calculateAgeProximity(age1, age2) {
    return 1 / (1 + Math.abs(age1 - age2));  // Higher score for smaller age differences
}

// Function to suggest friends based on interests and age
function suggestFriends() {
    const nameInput = document.getElementById('name').value.trim();
    const ageInput = parseInt(document.getElementById('age').value.trim(), 10);
    const interestsInput = document.getElementById('interests').value.trim();
    const userInterests = interestsInput.split(',').map(interest => interest.trim()).filter(interest => interest);

    if (!nameInput || isNaN(ageInput) || !userInterests.length) {
        alert('Please enter your name, age, and interests.');
        return;
    }

    const sameAgeSuggestions = students.filter(student => student.age === ageInput && student.name !== nameInput);

    if (sameAgeSuggestions.length > 0) {
        displaySuggestions(sameAgeSuggestions, true);
        return;
    }

    const suggestions = students
        .map(student => ({
            name: student.name,
            age: student.age,
            interests: student.interests,
            interestSimilarity: calculateSimilarity(userInterests, student.interests),
            ageProximity: calculateAgeProximity(ageInput, student.age)
        }))
        .map(student => ({
            ...student,
            totalScore: student.interestSimilarity + student.ageProximity // Composite score
        }))
        .filter(student => student.name !== nameInput && student.interestSimilarity > 0)
        .sort((a, b) => b.totalScore - a.totalScore);

    displaySuggestions(suggestions, false);
}

// Function to display suggestions in the UI
function displaySuggestions(suggestions, isSameAge) {
    const suggestionsList = document.getElementById('suggestions');
    suggestionsList.innerHTML = '';

    if (isSameAge) {
        const heading = document.createElement('h3');
        heading.textContent = 'Friends with the same age:';
        suggestionsList.appendChild(heading);
    } else {
        const heading = document.createElement('h3');
        heading.textContent = 'Friends based on interests and age proximity:';
        suggestionsList.appendChild(heading);
    }

    suggestions.forEach(suggestion => {
        const listItem = document.createElement('li');
        listItem.textContent = `${suggestion.name} (age: ${suggestion.age}, interests: ${suggestion.interests.join(', ')})`;
        if (!isSameAge) {
            listItem.textContent += `, similarity: ${suggestion.interestSimilarity}, age proximity: ${suggestion.ageProximity.toFixed(2)}, total score: ${suggestion.totalScore.toFixed(2)}`;
        }
        suggestionsList.appendChild(listItem);
    });
}
