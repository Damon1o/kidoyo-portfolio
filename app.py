from flask import Flask, render_template

app = Flask(__name__)

# Data model mapping to Damon's profile
profile_data = {
    'name': 'Damon Lin',
    'alias': 'ᵈᵃᵐᵒⁿ',
    'glance_stats': {
        'mastery_badges': 36,
        'micro_badges': 415,
        'projects': 54,
        'hackathon_wins': 4,
        'active_communities': 7,
        'years_active': '2024-2026'
    },
    'skills': [
        {'name': 'Python', 'percentage': 95, 'color': '#1088cf'},
        {'name': 'Hatch!', 'percentage': 89, 'color': '#27ae60'},
        {'name': 'Web Dev', 'percentage': 99, 'color': '#e67e22'},
        {'name': 'Java', 'percentage': 85, 'color': '#8e44ad'},
        {'name': 'C++', 'percentage': 80, 'color': '#ef4444'},
        {'name': 'Sprite Art', 'percentage': 75, 'color': '#FDDA0D'}
    ],
    'communities': [
        'Build Leaders', 'Hauppauge SD', 'HMS Coding 8', 
        'Code Conquest JR', 'Web Dev Pros', 'AI Classroom', 'Mobile Systems'
    ],
    'mastery_packs': [
        {
            'icon': 'fa-trophy', 'color': '#1088cf',
            'type': 'Hackathon Mastery', 
            'title': 'Code Conquest Leader', 
            'desc': 'Extensive participation as a team captain and a core member of the team across JR/HS divisions in 2024-2026.',
            'chips': ['🏆 2024 Runner-Up', '🏆 2025 2nd Place', '🏆 2026 Contender']
        },
        {
            'icon': 'fa-code', 'color': '#27ae60',
            'type': 'Certified Mastery', 
            'title': 'Web Design Pro', 
            'desc': 'Verified credentials in modern site deployment, mobile responsive layouts, and structural HTML/CSS.',
            'chips': ['🔋 Live Deployment', '🔋 Flexbox/Grid', '🔋 UX Flow']
        },
        {
            'icon': 'fa-microchip', 'color': '#e67e22',
            'type': 'Hardware Mastery', 
            'title': 'Arduino Architect', 
            'desc': 'Deep exploration into physical computing, circuit logic, and real-world sensor integration projects.',
            'chips': ['⚙️ Circuits', '⚙️ Signal Logic', '⚙️ Hardware']
        },
        {
            'icon': 'fa-vials', 'color': '#8e44ad',
            'type': 'Systems Languages', 
            'title': 'C++ & Go Prodigy', 
            'desc': 'Strong fundamentals in Go and C++ completing Bubble Sort, Selection Sort, and algorithmic challenges.',
            'chips': ['🔮 Go - Sorting', '🔮 Go - AI Games', '🔮 C++ Games']
        }
    ]
}

def calculate_radar():
    """Calculates SVG points for the radar chart polygon based on skills data."""
    center = (120, 120)
    # Vectors for the 6 axes (Top, Top-Right, Bottom-Right, Bottom, Bottom-Left, Top-Left)
    axes_vectors = [
        (0, -80),   # Python (Top)
        (60, -40),  # Hatch! (Top-Right)
        (60, 40),   # Web Dev (Bottom-Right)
        (0, 80),    # CS Theory (Bottom)
        (-60, 40),  # Compete (Bottom-Left)
        (-60, -40)  # Teaching (Top-Left)
    ]
    
    points = []
    for i, skill in enumerate(profile_data['skills']):
        p = skill['percentage'] / 100.0
        v = axes_vectors[i]
        x = center[0] + (v[0] * p)
        y = center[1] + (v[1] * p)
        points.append(f"{round(x,1)},{round(y,1)}")
    
    return " ".join(points)

@app.route("/")
def index():
    # Append dynamic radar points to the data object
    profile_data['radar_points'] = calculate_radar()
    return render_template("index.html", data=profile_data)

@app.route("/badges")
def badges():
    return render_template("badges.html", data=profile_data)

@app.route("/projects")
def projects():
    return render_template("projects.html", data=profile_data)

@app.route("/about")
def about():
    return render_template("about.html", data=profile_data)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
